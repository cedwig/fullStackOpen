const AddEntryForm = (props) => {
    return (
        <div className="entryFormContainer">
            <h2>add a new</h2>
            <form className="form" onSubmit={props.addPerson}>
                <div className="formInput">
                name: <input value={props.newName} onChange={props.handleInputNameChange} />
                </div>
                <div className="formInput">
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