const Search = ({ value, handleChange }) => {
    return (
        <form>
            Find countries: <input value={value} onChange={handleChange} />
        </form>
    )
}

export default Search