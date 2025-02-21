require('dotenv').config()
const { connect } = require('mongoose');
const {server, app, io} = require('./src/Server');
const { socketEvents } = require('./src/socket/index');

let URI = process.env.URI;
let port = app.get('port')

connect(URI)
.then(() => console.log('Conectado a MongoDB'))
.then(()=> server.listen(port, () => { console.log(`App listening on port ${port}`) }))
.then(() => socketEvents(io))
.catch(err => console.error('Error conectando a MongoDB:', err));



