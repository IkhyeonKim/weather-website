const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geoCode = require('./utils/geoCode')
const forecast = require('./utils/forecast')
const request = require('request')

const app = express()

const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static assets
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Ikhyeon'
    })

})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Ikhyeon'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'I can help ya :)',
        name: 'Ikhyeon'
    })
})


app.get('/weather', (req, res) => {

    const address = req.query.address

    if(!req.query.address){
        return res.send({
            error: 'You must provide address'
        })
    }

    geoCode(address, (err, {longitude, latitude, location} = {}) => {
        if(err){
            return res.send({ err: err })
        }

        forecast(longitude, latitude, (err, forecastData) => {
            if(err){
                return res.send({ err: err })
            }

            res.send({
                title: 'Weather',
                name: 'Ikhyeon',
                forecast: forecastData,
                location: location,
                address: address
            })
        })
    })


})

app.get('/products', (req, res) => {
    
    if(!req.query.search){
        return res.send('You must provide search term')
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', { 
        title: 'Article 404',
        name: 'Ikhyeon',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => { // * <- match anything that hasn't been matched so far, so 404 handler has to be the last one
    res.render('404', {
        title: '404',
        name: 'Ikhyeon',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port 3000')
})
