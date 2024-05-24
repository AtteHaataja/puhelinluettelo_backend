require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors');
const Person = require('./models/person')
app.use(express.static('dist'))
app.use(cors())
app.use(express.json());

morgan.token('postData', (req) => {
  if (req.method === 'POST' && req.body) {
    return JSON.stringify(req.body);
  }
  return '';
});
app.use(morgan(':method :url :status :res[content-length] - :response-time ms - :postData'))

const generateId = () => {
  const newId = Math.floor(Math.random() * 1000 );
  return newId;
}


/*let persons = [
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
]*/


app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
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

app.delete('/api/persons/:id', (request, response) => {
  const personId = Number(request.params.id);
  persons = persons.filter(person => person.id !== personId);

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const body = request.body;

  if (!body.name){
    response.status(400).json({error: 'Name is required'});
  } else if (!body.phonenumber) {
    response.status(400).json({error: 'Phone number is required'});
  } else if (persons.find(person => person.name === body.name)) {
    response.status(400).json({error: 'Name already in the phonebook'});
  } else {
    const newPerson = {
      name: body.name,
      number: body.phonenumber,
      id: generateId(),
    }
    console.log(newPerson);
    persons = persons.concat(newPerson);
    console.log(persons);

    response.json(newPerson);
  }
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`)
})
