const request = require('request')
const geocode = (address, callback) => {
    const url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURIComponent(address) + '&key=AIzaSyCCvh3sEC2z3f3QB8X7ZE3893GmClhBhGY';

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined);
        } else if (body.error_message) {
            callback('Error: ' + body.error_message, undefined);
        } else if (body.status === 'ZERO_RESULTS') {
            callback('Unable to find location. Try another search.', undefined);
        } else {
            // Extracting latitude and longitude from the first result
            const location = body.results[0].geometry.location;
            callback(undefined, {
                latitude: location.lat,
                longitude: location.lng
            });
        }
    });
};

module.exports = geocode