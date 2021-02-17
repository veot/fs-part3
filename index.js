const { response, request } = require("express");
const express = require("express");

const PORT = 3001;
const app = express();
app.use(express.json());

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
  response.json(persons);
});

app.get("/info", (request, response) => {
  const info1 = `Phonebook has info for ${persons.length} people`;
  const info2 = new Date();
  response.send(`<p>${info1}</p><p>${info2}`);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((p) => p.id === id);
  if (person) response.json(person);
  else response.status(404).end();
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((p) => p.id !== id);
  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  console.log(request.body);
  if (!body.name) {
    return response.status(400).json({ error: "name missing" });
  }
  const person = {
    name: body.name,
    number: body.number,
    id: Math.round(Math.random() * 10 ** 10),
  };
  persons = persons.concat(person);
  response.json(person);
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
