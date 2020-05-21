const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('build'))

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 4,
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

morgan.token("content", (req, res) => {
  // req.body is of object type -> will log [object Object]
  console.log(typeof req.body);
  const content = JSON.stringify(req.body);
  // after conversion, content is of string type
  console.log(typeof content);
  return content;
});

app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :content"
  )
);

app.get("/", (request, response) => {
  response.send("Hello World");
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/info", (request, response) => {
  response.send(
    `Phonebook has info for ${persons.length} people <br /> ${Date()}`
  );
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);

  response.json(persons);
});

app.post("/api/persons", (request, response) => {
  const id = Math.floor(Math.random() * 100);
  const body = request.body;
  if (!body.name || !body.number) {
    response.status(400).send("Error: Missing parameter in content").end();
  } else if (
    persons.map((person) => person.name).includes(body.name) === true
  ) {
    response.status(400).send("Error: Name must be unique").end();
  }
  const person = { name: body.name, number: body.number, id: id };

  response.json(person);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
