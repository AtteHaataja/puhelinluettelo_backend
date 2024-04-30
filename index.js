const express = require('express');
const app = express();


let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456"
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523"
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345"
  },
  {
    id: 4,
    name: "Mary Poppendick",
    number: "39-23-6423122"
  }
]


app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/info', (request, response) => {
  const personsInArray = persons.length
  //Getting time zone of the user and print it to the screen
  const timestampInMillis = Date.now();
  const date = new Date(timestampInMillis);
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const formattedDate = date.toLocaleString("en-US", {
    timeZone: userTimeZone,
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "longOffset",
  });

  response.send('<div style="display: flex; align-items: center;">\n' +
                      '<p style="margin-right: 10px;">Phonebook has info for</p>\n' +
                      personsInArray + '\n<p>people</p>\n' +
                      '</div>' +
                formattedDate)
})

app.get('/api/persons/:id', (request, response) => {
  const personId = Number(request.params.id);
  const person = persons.find(person => person.id === personId);
  if (person) {
    response.json(person)
  } else {
    response.status(404).end();
  }
})


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`)
})
