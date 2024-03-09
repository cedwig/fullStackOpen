const Search = ({searchInput, setSearchInput}) => {
    const handleInputChange = (event) => {
        setSearchInput(event.target.value)
    }

    return (
        <label>
            Find Countries: <input type="text" value={searchInput} onChange={handleInputChange} />
        </label>
    )
}

export default Search