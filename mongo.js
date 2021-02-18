const mongoose = require("mongoose");

const args = process.argv;

if (args.length !== 3 && args.length !== 5) {
  console.log("Usage: mongo.js <password> [name] [number]");
  process.exit(1);
}

const password = args[2];

const URL = `mongodb+srv://otso:${password}@fullstackopen.rd9wz.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Database connected successfully"))
  .catch(() => console.log("Unable to connect to database"));

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

const createPerson = (name, number) => {
  const person = new Person({ name, number });
  person.save().then((res) => {
    console.log(`Added ${name} ${number} to phonebook`);
    mongoose.connection.close();
  });
};

const getPeople = () => {
  Person.find({}).then((res) => {
    console.log("Phonebook:");
    res.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
};

if (args.length === 5) createPerson(args[3], args[4]);
else getPeople();
