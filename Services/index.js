const express = require('express')
const path = require('path')
const hbs = require('hbs')

const app = express()
const port = 3000

const dirPublic = path.join(__dirname, '../public')
const dirPartials = path.join(__dirname, '../partials')

app.use(express.static(dirPublic))
hbs.registerPartials(dirPartials)

app.set('view engine', 'hbs')

app.get('/', (req, res) => {
    res.render('index', {})
})

app.listen(port, () => console.log(`App listening in port ${port}!`))