import { useState, useEffect } from 'react'
import Search from './components/Search'
import countries from './services/countries'
import weatherService from './services/weather'
import Results from './components/Results'

function App() {
  const [searchInput, setSearchInput] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [allCountries, setAllCountries] = useState([])
  const [weatherData, setWeatherData] = useState({})

  const showInfo = async (e) => {
    const countryToShow = e.target.closest('li').firstChild.textContent
    const countryObject = await countries.getCountry(countryToShow)
    setSearchResults([countryObject])
  }

  useEffect(() => {
    countries.getAll()
    .then(countryList => {
      setAllCountries(countryList)
    })
  }, [])


  useEffect(() => {
    const filteredCountries = allCountries.filter( country => {
       return country.name.common.toLowerCase().includes(searchInput.toLowerCase())
      })
    setSearchResults(filteredCountries)
  }, [searchInput, allCountries])

  useEffect(() => {
    if (searchResults.length === 1) {
      const getWeatherData = async () => {
        const weatherObject = await weatherService.getWeatherFrom(searchResults[0].capital)
        setWeatherData(weatherObject)
      }
      getWeatherData()
    } else {
      setWeatherData(null)
    }
  }, [searchResults])

  return (
    <>
      <Search searchInput={searchInput} setSearchInput={setSearchInput} searchResult={searchResults} />
      <Results countries={searchResults} showInfo={showInfo} weatherData={weatherData} />
    </>
  )
}

export default App
