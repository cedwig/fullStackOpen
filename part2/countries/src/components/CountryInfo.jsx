const CountryInfo = ({country}) => {
    return (
        <div className="countryinfos">
            <h1>{country.name.common}</h1>
            <div>capital: {country.capital[0]}</div>
            <div>area: {country.area}</div>
            <h2><b>languages:</b></h2>
            <ul>
                {Object.entries(country.languages).map(([key, value])=> (
                    <li key={key}>{value}</li>
                ))}
            </ul>
            <img src={country.flags.svg} />
        </div>
    )
}

export default CountryInfo