import Number from "./Number"

const Numbers = (props) => {
    return (
        <div>
            <h2>Numbers</h2>
            <ul>
                {
                props.personsToShow.map(person => 
                    <Number key={person.id} name={person.name} number={person.number} />
                )
                }
            </ul>
        </div>
    )
}

export default Numbers