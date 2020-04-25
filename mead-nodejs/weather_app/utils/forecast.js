const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=3f9d9ce1389e8aeb5ad2acd52dac539b&query=' + lat + ',' + long + '&units=f'
    
    request({ url: url, json: true }, (error, response) => {
                if (error) {
                    callback('Unable to connect to weather service!', undefined)
                } else if (response.body.error) {
                    callback('Unable to find location', undefined)
                } else {
                    const data = response.body.current
                    callback(undefined, `${data.weather_descriptions[0]}. It is currently ${data.temperature} degrees out. It feels like ${data.feelslike} degrees out.`)
                }
            })
}

module.exports = forecast
