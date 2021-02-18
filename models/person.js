const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

console.log(`Connecting to MongoDB`);

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true,
  })
  .then((res) => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting to MongoDB:", err.message));

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

personSchema.set("toJSON", {
  transform: (doc, obj) => {
    obj.id = obj._id.toString();
    delete obj._id;
    delete obj.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
