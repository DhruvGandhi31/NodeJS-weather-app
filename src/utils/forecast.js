const request = require('request');

const forecast = (lat, long, callback) => {
    const url = `http://api.weatherapi.com/v1/current.json?key=de8cfa13feb04d159d1181745241502&q=${lat},${long}&aqi=no`;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            const data = body;
            const forecastData = {
                location: data.location.region,
                temperature_c: data.current.temp_c,
                humidity: data.current.humidity
                // Add other forecast data here as needed
            };
            callback(null, forecastData);
        }
    });
};

module.exports = forecast;
