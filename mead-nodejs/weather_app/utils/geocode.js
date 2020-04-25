const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic3VuZ25nYSIsImEiOiJjazB2cW1kNTEwdXdwM2NvMDBmM2kxaTloIn0.fO_TBwhds2S0-PmbeL2nqw&limit=1'

    request({ url: url, json: true }, (err, res) => {
        if (err) {
            callback('Unable to connect to location services!', undefined)
        } else if (res.body.features.length === 0) {
            callback('Unable to find location. Try another search', undefined)
        } else {
            const data = res.body.features[0]
            callback(undefined, {
                latitude: data.center[1],
                longitude: data.center[0], 
                location: data.place_name
            })
        }
    })
}

module.exports = geocode