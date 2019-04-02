const express = require('express')
const path = require('path')
const hbs = require('hbs')
const bodyParser = require('body-parser')
require('./helpers')

const app = express()
const port = 3000

const dirPublic = path.join(__dirname, '../public')
const dirPartials = path.join(__dirname, '../partials')

app.use(express.static(dirPublic))
hbs.registerPartials(dirPartials)
app.use(bodyParser.urlencoded({extended: false}))

app.set('view engine', 'hbs')

app.get('/', (req, res) => {
    res.render('index', {})
})

app.get('/userregistration', (req, res) => {
    res.render('userRegistration', {})
})

app.post('/userregistration/finished', (req, res) => {
    res.render('userRegistrationFinished', {
        primerNombre: req.body.primerNombre ,
        segundoNombre: req.body.segundoNombre ,
        identificacion: req.body.identificacion ,
        email: req.body.email ,
        curso: req.body.curso ,
    })
})

app.get('/courseregistration', (req, res) => {
    res.render('courseRegistration', {})
})

app.post('/courseregistration/finished', (req, res) => {
    res.render('courseRegistrationFinished', {
        nombre: req.body.nombre ,
        id: req.body.id ,
        valor: req.body.valor ,
        descripcion: req.body.descripcion ,
        intensidad: req.body.intensidad ,
        modalidad: req.body.modalidad ,
    })
})

app.get('/users', (req, res) => {
    res.render('users', {})
})

app.get('/courses', (req, res) => {
    res.render('courses', {})
})

app.get('*', (req, res) => {
    res.render('404', {})
})


app.listen(port, () => console.log(`App listening in port ${port}!`))