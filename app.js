// Imports
const express = require('express')
const colors = require('colors')
// const { dirname } = require('path')
const dotenv = require('dotenv').config()
const connectDB = require('./backend/db/dbConnect')
connectDB()

// Create 
const port = process.env.PORT || 3000
const app = express()

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Static pages
app.use(express.static('frontend'))
app.use('/css', express.static(__dirname + '/frontend/public/css'))
app.use('/js', express.static(__dirname + '/frontend/public/js'))
app.use('/img', express.static(__dirname + '/frontend/public/img'))

// API Routing pages
app.use('/api/questions', require('./backend/routes/questionRoutes'))

// set views
app.set('views', 'frontend/views')
app.set('view engine', 'ejs')

// Get index and render the response.
app.get('', (req, res) => {
    res.render('index', { text: " - home"})
})

// Get about uri and render the response.
app.get('/about', (req, res) => {
    res.render('about', { text: " - about"})
})

// Get quiz uri and render the response.
app.get('/quiz', (req, res) => {
        res.render('quiz')
})

// Get superfoodcircus uri and render the response.
app.get('/superfoodcircus', (req, res) => {
    res.render('superfoodcircus')
})

// Get recipes uri and render the response.
app.get('/recipes', (req, res) => {
    res.render('recipes')
})

// Get vitafresh uri and render the response.
app.get('/vitafresh', (req, res) => {
    res.render('vitafresh')
})

// Listen for port 5000
app.listen(port, () => console.info(`Started on port ${port}`))