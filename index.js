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

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id)
    .then((person) => {
      response.json(person);
    })
    .catch((err) => {
      response.status(404).end();
    });
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((p) => p.id !== id);
  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  let errorMessage = undefined;
  if (body.name === undefined) errorMessage = "name missing";
  else if (body.number === undefined) errorMessage = "number missing";
  // else if (persons.some((p) => p.name === body.name))
  //   errorMessage = "name already exists";
  if (errorMessage) return response.status(400).json({ error: errorMessage });

  const person = new Person({
    name: body.name,
    number: body.number,
  });
  person.save().then((savedPerson) => response.json(savedPerson));
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
