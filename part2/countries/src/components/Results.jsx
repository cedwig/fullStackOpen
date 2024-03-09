import Weather from "../components/Weather"
import CountryInfo from "./CountryInfo"
import Result from "./Result"

const Results = ({countries, showInfo, weatherData}) => {
    if (countries.length > 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    } else if (countries.length === 1) {
        return (
            <div>
                <CountryInfo country={countries[0]} />
                <Weather weatherData={weatherData} />
            </div>
        )
    } else {
        return (
            <ul>
                {countries.map(country => (
                        <Result 
                            key={(country.name.common)}
                            country={country.name.common}
                            showInfo={showInfo}
                        />
                ))}
            </ul>
        )
    }
}

export default Results