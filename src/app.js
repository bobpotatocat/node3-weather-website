const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const weather = require('./utils/weather')

const app = express()

//define paths for excess config
const publicDirectoryPath = path.join(__dirname, '../public/')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//set up hanblebars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//set up static dir to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Andrew'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "about me",
        name: "bread"
    })
})

app.get('/help', (req,res)=>{
    res.render('help', {
        title:'help page',
        name: 'bread'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error:'you must provide address!'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, placeName} = {}) => {
        if(error){
            return res.send({error:error})
        }

        weather(latitude, longitude, placeName , (error, data) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast: data,
                //placeName,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide search term!'
        })
    }
    console.log(req.query.search)
    res.send({
        products : []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title:'404',
        name:'bob',
        errorMessage:"help article not found"
        
    })
})

//non existent page
app.get('*', (req,res)=>{
    res.render('404', {
        title:'404',
        name:'bob',
        errorMessage: "page not found"
    })
})
//app.com --> app.com/about or app.com/products
app.listen(3000, () => {
    console.log("server is up on port 3000")
})