const request = require('request')
const geoCode = require('./geoCode')

const forecast = (longitude, latitude, callback) => {

    const url = `https://api.darksky.net/forecast/dc2a39b9113e20dfe92243a62493bc20/${latitude},${longitude}?units=si`

    request({url, json: true}, (err, { body }) => {
        if(err){
            callback('Unable to connect', undefined)
        }else if(body.error){
            callback(body.error, undefined)
        }else{
            const rainChance = body.currently.precipProbability
            const temperature = body.currently.temperature
            const summary = body.daily.data[0].summary

            //temperature = Number.parseFloat((temperature - 32) * 5/9, -2).toFixed(2)

            // console.log(res.body.daily.data[0].summary)
            // console.log(`It is currently ${chalkBlue(temperature)} degrees out. There is a ${chalkGreen(rainChance)}% chance of rain`)

            callback(undefined, `${summary} It is currently ${temperature} degrees out. There is a ${temperature}% chance of rain`)
        }
    })
}

module.exports = forecast