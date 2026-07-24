'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 8080;

mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://jose:macros98@ds159344.mlab.com:59344/sudoku', { useMongoClient: true})
mongoose.connect('mongodb://root:example@localhost:27017/sudoku', { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    authSource: 'admin'
})  
    .then(() => {
        console.log('La conexion a la base de datos se realizo correctamente...');
        app.listen(port, () => {
            console.log("El servidor local estan corriendo en localhost "+port);
        });
    })
    .catch(err => console.log(err));
