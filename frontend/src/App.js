import { useState, useEffect} from 'react'
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import Notification from './components/Notification'
import phonebook from "./service/phonebook";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    phonebook.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, [])


  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target) 
    const noteObject = {
      name: newName,
      number: newNumber
    };

    const personToChange = persons.some((p) => p.name === newName);
    if (personToChange) {
      const oldPerson = persons.find((p) => p.name === newName);
      const newPerson = { ...oldPerson, number: newNumber };
      window.confirm(
        `${newName} ia already added to phonebook, replace the old number with a new one?`
      ) &&
        phonebook
          .update(oldPerson.id, newPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== oldPerson.id ? person : returnedPerson
              )
            );
          });
          console.log('contact number changed')
          setMessage(`Contact ${noteObject.name} number changed to ${noteObject.number}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
    } else {
      phonebook.create(noteObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
      });
      console.log('new contact added')
      setMessage(`Added ${noteObject.name}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }

    setNewName("");
    setNewNumber("");
  }
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)   
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleFilter = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)   
  }

  const handleDelete = (id, name) => {
    window.confirm(`Delete ${name}?`) &&
      setMessage(`${name} deleted`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      phonebook.remove(id).then(() => {
        const newPersons = persons.filter((item) => item.id !== id);
        setPersons(newPersons);
      });
    console.log('contact info deleted')
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <></>
      <Filter handleFilter={handleFilter} filter={filter} />
      <h2>Add a new</h2>
      <PersonForm
        addPerson={addPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons filter={filter} persons={persons} deletePerson={handleDelete}/>
    </div>
  )
}
export default App