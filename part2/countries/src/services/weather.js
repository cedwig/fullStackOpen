import axios from 'axios'
const baseUrl = 'http://api.weatherapi.com/v1'
// free plan so doesnt matter if public
const api_key = import.meta.env.VITE_SOME_KEY

const getWeatherFrom = (location) => {
    const request = axios.get(`${baseUrl}/current.json?key=${api_key}&q=${encodeURIComponent(location)}`)
    return request.then(response => response.data)
}

console.log(getWeatherFrom('germany'))

export default {getWeatherFrom}