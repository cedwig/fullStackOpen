const Weather = ({weatherData}) => {
    if (weatherData === null) return null
    return (
        <div className="weatherInfo">
            <h1>Weather in {weatherData.location.name}</h1>
            <div>temperature {weatherData.current.temp_c}℃</div>
            <img src={weatherData.current.condition.icon} />
            <div>wind {weatherData.current.wind_kph} km/h</div>
        </div>
    )
}

export default Weather