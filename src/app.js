const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();

//Define paths for exress config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views'); // Specify the path to your views directory
const partialsPath = path.join(__dirname, '../templates/partials');

//setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath); // Set the views directory
hbs.registerPartials(partialsPath)

//setup static directory to server 
app.use(express.static(publicDirectoryPath));


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Dhruv'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Watashi no koto',
        name: 'chunibyuo'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'Kochira wa sapotopejidesu'
    });
});
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, data = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(data.latitude, data.longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location: data.location,
                address: req.query.address
            })
        })
    })

    // res.send({
    //     forecast: 'It is snowing',
    //     location: 'London',
    //     address: req.query.address
    // })

});



app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Dhruv',
        errorMsg: 'Page not found'
    })
});



app.listen(3000, () => {
    console.log('Server is up at port 3000');
});
