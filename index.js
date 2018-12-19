const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())
// Loggaus konsoliin
const morgan = require('morgan')
app.use(morgan('tiny'))
// app.use(morgan('common'))
// app.use(morgan('combined'))

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

app.delete('/api/persons/:id', (request, response) => {
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
  const body = request.body
  if (body.name === undefined || body.name === '') {
    return response.status(400).json({error: 'Name missing'})
  }
  if (body.number === undefined || body.number === '') {
    return response.status(400).json({error: 'Number missing'})
  }
  const result = persons.find(person => person.name.toLowerCase === body.name.toLowerCase)
  if (result !== undefined) {
    return response.status(400).json({error: 'Name is already on the PhoneBook'})
  }else {
    const person = {
      name: body.name,
      number: body.number,
      id: generateId()
    }

    persons = persons.concat(person)

    console.log(person)

    response.json(person)}
})
const generateId = () => {
  const personID = Math.floor(Math.random() * 1000 + 1)
  return (personID)
}

const error = (request, response) => {
  response.status(404).send({error: 'unknown endpoint'})
}

app.use(error)
