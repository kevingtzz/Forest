const express = require('express')
const config = require('../config')
const path = require('path')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)


//settings
app.set('view engine', 'ejs')
app.engine('html', require('ejs').renderFile)
server.listen(config.server_port)

//Middlewares
app.use(express.urlencoded({ extended: false }))

//Routes
app.use(require('./routes/routes'))

//static files
app.use(express.static(path.join(__dirname, 'public')))

app.listen(config.port, ()=> {
    console.log(`Forest App running on http://localhost:${config.port}`)
})

io.on('connection', (socket) => {
    socket.emit('news', { hello: 'world' })
    socket.on('my other event', (data) => {
        console.log(data)
    })
})