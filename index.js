'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 8080;

mongoose.Promise = global.Promise;

// Use environment variable for MongoDB URI, fallback to local connection
const mongoUri = process.env.MONGODB_URI || 'mongodb://root:example@localhost:27017/sudoku?authSource=admin';

mongoose.connect(mongoUri, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
})  
    .then(() => {
        console.log('La conexion a la base de datos se realizo correctamente...');
        app.listen(port, () => {
            console.log("El servidor local estan corriendo en localhost "+port);
        });
    })
    .catch(err => console.log(err));
