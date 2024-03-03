const SearchFilter = (props) => {
    return (
        <div>
        filter shown with <input value={props.newFilterName} onChange={props.handleInputFilterChange} />
        </div>
    )
}

export default SearchFilter