const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { readSync } = require('fs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const { response } = require('express')
const { request } = require('http')

const app = express()

//defining paths
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

//setup handle bars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)


app.get('', (req, res)=>{
    res.render('index',{
        title: 'Weather app',
        name:'MJ'
    })
})
app.get('/about', (req, res)=>{
    res.render('about',{
        title: 'About page',
        name:'MJ'
    })
})

app.get('/help', (req, res)=>{
    res.render('help',{
        title: 'Help page',
        helpText:'If you need help god bless you just pray ',
        name:'MJ'
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

    // res.send({
    //     forecast: 'It is snowing',
    //     location: 'Dubai',
    //     address: req.query.address
    // })


})



app.get('/help/*', (req,res)=>{
    res.render('404',{
        title:'404',
        name:'mj',
        errorMessage:'Help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name: 'mj',
        errorMessage:'page not found'
    })
})

app.listen(3000,()=> {
    console.log('server is running on port 3000')
})