console.log('client side javascript file is loaded')

// fetch('https://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data);
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msgOne = document.querySelector('#msg-1')
const msgTwo = document.querySelector('#msg-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value;
    fetch('http://localhost:3000/weather?address=' + location)
        .then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    msgOne.textContent = data.error;
                } else {
                    // Display location
                    msgOne.textContent = 'Location: ' + data.address;

                    // Display forecast data
                    msgTwo.textContent = 'Forecast: ' + data.forecast.location + ', Temperature: ' + data.forecast.temperature_c + '°C, Humidity: ' + data.forecast.humidity + '%';
                }
            });
        })
        .catch((error) => {
            console.error('Error fetching weather data:', error);
        });


})