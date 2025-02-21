const express = require('express')
const http = require('http')
const socketIo = require('socket.io');
const path = require('path');
const cors = require('cors')
const morgan = require('morgan');

const app = express()
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: '*',  methods: ['GET', 'POST'] } });

app.set('port', process.env.PORT || 3000)


app.use(express.static(path.join(__dirname, '../public/dist')))
app.use(express.json())
app.use(cors())
app.use(morgan('common'))

app.use('/api/turnos', require('./routes/RouterTurnos'));
app.use('/api/description', require('./routes/RouterDescripcion'));



app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/dist/index.html'));
});

module.exports = {server, app, io}