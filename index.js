const express = require('express')
const app = express()


console.log('hello world')

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

  app.use(express.json())


  app.get('/info', (request, response) => {
    response.send(`<p>Phonebook has info for ${persons.length} people</p> <p>${new Date()}</p>` )
})

  app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
  })
  
  app.get('/api/persons', (req, res) => {
    res.json(persons)
  })

//POST http://localhost:3001/api/persons
//Content-Type: application/json

//Get specific person
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
  
    if (person) {
      response.json(person)
      console.log("Person found")
    } else {
      response.status(404).end()
      console.log("Wrong ID")
    }
  })

  //Delete person
  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
    console.log("Person deleted")
  })
  
  const PORT = 3001
  app.listen(PORT)
  console.log(`Server running on port ${PORT}`)