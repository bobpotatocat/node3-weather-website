const request = require('request')

const geocode =  (address, callback ) => {

    const geoUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYm9iY2F0MTQzIiwiYSI6ImNrOTNubzR4ODAza3gzbXFldGc3ams4dGcifQ._w-VDDB2YLmcnqrrC2nCqQ&limit=1'

    request({url:geoUrl, json: true}, (error, {body}) => {
        if (error){
            callback("unable to connect new geo service", undefined)
        }else if(body.features[0] === undefined ){
            callback('unable to find location for geo service ', undefined)
        }else{
            callback(undefined, {
                placeName : body.features[0].place_name,
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0]
            })
        }
    })
}
module.exports = geocode