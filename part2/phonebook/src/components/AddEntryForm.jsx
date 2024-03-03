const AddEntryForm = (props) => {
    return (
        <div>
            <h2>add a new</h2>
            <form onSubmit={props.addPerson}>
                <div>
                name: <input value={props.newName} onChange={props.handleInputNameChange} />
                </div>
                <div>
                number: <input value={props.newNumber} onChange={props.handleInputNumberChange} />
                </div>
                <div>
                <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
}

export default AddEntryForm