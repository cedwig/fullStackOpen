import { useState, useEffect } from 'react';
import './styles.css';
import SearchFilter from './components/SearchFilter';
import AddEntryForm from './components/AddEntryForm';
import Numbers from './components/Numbers';
import personService from './services/people';
import Notification from './components/Notification';

const App = () => {
  const [people, setPeople] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilterName, setNewFilterName] = useState('');
  const [notifMessage, setNotifMessage] = useState(null);
  const [notifStyle, setNotifStyle] = useState('notification');

  useEffect(() => {
    personService.getAll().then((person) => {
      setPeople(person);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    if (newName === '') return;

    if (checkAlreadyExisting()) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const existingPerson = people.find((p) => p.name === newName);
        const changedNumber = { ...existingPerson, number: newNumber };
        personService
          .update(existingPerson.id, changedNumber)
          .then((returnedPerson) => {
            setPeople(
              people.map((person) =>
                person.id !== existingPerson.id ? person : returnedPerson
              )
            );
          })
          .catch((error) => {
            setNotifMessage(
              `${newName} is an invalid name. Name needs to be at least 3 characters`
            );
            setNotifStyle('notification error');
            setTimeout(() => {
              setNotifMessage(null);
              setNotifStyle('notification');
            }, 3000);
          });
        setNotifMessage(`Updated ${newName}'s number to: ${newNumber}`);
        setTimeout(() => {
          setNotifMessage(null);
        }, 3000);
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };

      personService
        .create(newPerson)
        .then((returnedPerson) => {
          setPeople(people.concat(returnedPerson));
        })
        .catch((error) => {
          setNotifMessage(
            `${newName} is an invalid name. Name needs to be at least 3 characters`
          );
          setTimeout(() => {
            setNotifMessage(null);
          }, 3000);
        });

      setNotifMessage(`Added ${newName}`);
      setTimeout(() => {
        setNotifMessage(null);
      }, 3000);
    }

    setNewName('');
    setNewNumber('');
  };

  const checkAlreadyExisting = () => {
    return people.some((person) => person.name === newName);
  };

  const deletePerson = (id, name) => {
    personService
      .remove(id)
      .then(() => {
        setNotifMessage(`Removed ${name}`);
        setTimeout(() => {
          setNotifMessage(null);
        }, 3000);
        setPeople(people.filter((person) => person.id !== id));
      })
      .catch((error) => {
        setNotifMessage(`Error: ${error.message}`);
        setNotifStyle('notification error');
        setTimeout(() => {
          setNotifMessage(null);
          setNotifStyle('notification');
        }, 3000);
        console.error('Error removing person:', error);
      });
  };

  const peopleToShow =
    newFilterName === ''
      ? people
      : people.filter((person) =>
          person.name.toLowerCase().includes(newFilterName.toLowerCase())
        );

  const handleInputNameChange = (event) => setNewName(event.target.value);
  const handleInputNumberChange = (event) => setNewNumber(event.target.value);
  const handleInputFilterChange = (event) =>
    setNewFilterName(event.target.value);

  return (
    <div className="phonebook">
      <h2>Phonebook</h2>
      <Notification message={notifMessage} style={notifStyle} />
      <SearchFilter
        newFilterName={newFilterName}
        handleInputFilterChange={handleInputFilterChange}
      />
      <AddEntryForm
        newName={newName}
        newNumber={newNumber}
        handleInputNameChange={handleInputNameChange}
        handleInputNumberChange={handleInputNumberChange}
        addPerson={addPerson}
      />
      <Numbers peopleToShow={peopleToShow} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
