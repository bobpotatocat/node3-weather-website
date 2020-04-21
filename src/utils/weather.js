
const request = require('request')

const weather =  (latitude, longitude, placeName, callback ) => {
    const weatherUrl = 'http://api.weatherstack.com/current?access_key=30f281a36706e1b523654fda429b429b&query='+encodeURIComponent(latitude) +','+encodeURIComponent(longitude)

    request({url:weatherUrl, json: true}, (error, {body}) => { //since body is the only property accessed in response object 
        if (error){
            callback("unable to connect weather service", undefined)
        }else if(body.error){
            callback('unable to find location for weather service ', undefined)
        }else{
            callback(undefined, {
                currentTemperature : body.current.temperature,
                weatherCondition : body.current.weather_descriptions,
                humidity: body.current.humidity,
                feelsLike: body.current.feelsLike,
                placeName
            })
        }
    })
}
module.exports = weather