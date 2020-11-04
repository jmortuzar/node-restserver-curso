require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
app.disable('x-powered-by');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());

// configuracion global rutas
app.use( require('./routes/index') );

//Habilitar carpeta public
app.use(express.static(path.resolve(__dirname, '../public')));


mongoose.connect(process.env.URLDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }, (err, res) => {
    if(err) {
        throw err;
    } 

    console.log('Base de datos ONLINE');
});

app.listen(process.env.PORT, () => console.log('Escuchando puerto: ', process.env.PORT));