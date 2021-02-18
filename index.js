const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

require("dotenv").config();
const Person = require("./models/person");

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("build"));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

morgan.token("body", (req, res) => {
  if (req.method === "POST") return JSON.stringify(req.body);
  else return "";
});

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
];

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get("/info", (request, response) => {
  Person.find({}).then((persons) => {
    const info1 = `Phonebook has info for ${persons.length} people`;
    const info2 = new Date();
    response.send(`<p>${info1}</p><p>${info2}`);
  });
});

app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) response.json(person);
      else response.status(404).end();
    })
    .catch((err) => next(err));
});

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then((person) => {
      response.status(204).json(person);
    })
    .catch((err) => next(err));
});

app.post("/api/persons", (request, response, next) => {
  const body = request.body;
  let errorMessage = undefined;
  if (body.name === undefined) errorMessage = "name missing";
  else if (body.number === undefined) errorMessage = "number missing";
  if (errorMessage) return response.status(400).json({ error: errorMessage });

  Person.findOne({ name: body.name }).then((person) => {
    if (person) {
      Person.findByIdAndUpdate(
        person.id,
        { number: body.number },
        { new: true }
      )
        .then((updatedPerson) => response.json(updatedPerson))
        .catch((err) => next(err));
    } else {
      const person = new Person({
        name: body.name,
        number: body.number,
      });
      person
        .save()
        .then((savedPerson) => response.json(savedPerson))
        .catch((err) => next(err));
    }
  });
});

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (err, req, res, next) => {
  console.log(err.message);
  if (err.name === "CastError") {
    return res.status(400).send({ error: "malformed id" });
  }
  next(err);
};

app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
