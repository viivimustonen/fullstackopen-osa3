const express = require('express')
const app = express()
const morgan = require("morgan");
const cors = require('cors')



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

morgan.token('showData', function (req, res) { return JSON.stringify(req.body) })

app.use(morgan(':method :url :status :res[content-length] - :response-time ms | :showData'))

app.use(cors())

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
  })

//Info text
app.get('/info', (request, response) => {
    response.send(`<p>Phonebook has info for ${persons.length} people</p> <p>${new Date()}</p>` )
})

  //Get all persons
app.get('/api/persons', (req, res) => {
    res.json(persons)
})

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

const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(n => n.id))
      : 0
    return maxId + 1
}
  
  //Post new person
app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if (!body.name) {
      return response.status(400).json({ 
        error: 'Name missing'  
      })
    } 
    
    if (!body.number) {
        return response.status(400).json({ 
          error: 'Number is missing' 
        })
    }
    
    if (persons.some((person) => person.name === body.name)) {
        return response.status(400).json({
          error: "Name must be unique",
        })
    }
  
    const person = {
      name: body.name,
      number: body.number,
      id: generateId()
    }
  
    persons = persons.concat(person)
  
    response.json(person)
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)
  
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})