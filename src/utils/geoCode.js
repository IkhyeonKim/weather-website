const request = require('request')

const geoCode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoia2loMTIzNDAiLCJhIjoiY2p0Z3Fka3JyMHcwZzN5bXA2cTBzN2preiJ9.YjyaptRnW7phvOO6k2dMMw&limit=1`

    request({url, json: true}, (err, {body}) => {
        if(err){
            callback('Unable to connect to location services', undefined)
        }else if(body.features.length === 0){
            callback('Unable to find location', undefined)
        }else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode