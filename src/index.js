const express = require('express')
const bodyParser = require('body-parser')
const config = require('../config')
const api = require('./routes/routes')

const app = express()

//Middlewares
app.use(api)

app.listen(config.port, ()=> {
    console.log(`API REST running on http://localhost:${config.port}`)
})

