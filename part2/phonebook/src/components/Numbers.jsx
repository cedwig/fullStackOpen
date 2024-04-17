import Number from './Number';

const Numbers = (props) => {
  return (
    <div>
      <h2>Numbers</h2>
      <ul>
        {props.peopleToShow.map((person) => (
          <Number
            key={person.id}
            name={person.name}
            number={person.number}
            deleteBookEntry={() => props.deletePerson(person.id, person.name)}
          />
        ))}
      </ul>
    </div>
  );
};

export default Numbers;
