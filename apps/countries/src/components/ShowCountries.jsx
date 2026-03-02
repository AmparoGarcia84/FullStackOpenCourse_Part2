const ShowCountries = ({ countries }) => {
    if (countries.length > 0) {
        return (
            <div>
                {countries.map(country => <div key={country}>{country}</div>)}
            </div>
        )
    } else {
        return null
    }
}

export default ShowCountries