const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())

let persons = [
  {
    name: 'Arto Hellas',
    number: '040-123456',
    id: 1
  },
  {
    name: 'Martti Tienari',
    number: '040-1123456',
    id: 2
  },
  {
    name: 'Arto Järvinen',
    number: '040-123456',
    id: 3
  },
  {
    name: 'Lea Kutvonen',
    number: '040-123456',
    id: 4
  },
  {
    name: 'Neppa Nappula',
    number: '040-123456',
    id: 5
  }
]
// ROUTES
app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/info', (request, response) => {
  const personCount = persons.length
  // console.log(personCount)
  const time = new Date()
  const info = '<div> <p> Puhelinluettelossa on ' + personCount +
    '  henkilön tiedot. </p> <p> ' + time + '</p></div>'
  // console.log(time)
  response.send(info)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  // console.log(id)
  // const person = persons.find(person => {
  //   console.log(person.id, typeof person.id, typeof id, person.id === id)
  //   return person.id === id})
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
// console.log(person)
})

app.delete('/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const PORT = 3001
const time = new Date()
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} ${time} `)
})

app.post('/api/persons', (request, response) => {
  const personID = Math.floor(Math.random() * 1000 + 1)
  const person = request.body
  person.id = personID
  persons = persons.concat(person)

  console.log(person)

  response.json(person)
})
