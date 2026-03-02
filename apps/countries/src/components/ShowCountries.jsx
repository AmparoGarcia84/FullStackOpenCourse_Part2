const ShowCountries = ({ countries, handleClick }) => {
    if (countries.length > 0) {
        return (
            <div>
                {countries.map(country => <div key={country}>{country} <button onClick={() => handleClick(country)}>show</button></div>)}
            </div>
        )
    } else {
        return null
    }
}

export default ShowCountries