const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');


//Settings
const port = process.env.PORT || 3000;

//Middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());

//Motor Plantillas
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname+'/public'));

//ROUTES
app.use('/api/v1', require('./routers/API'));
app.use('/jugadores', require('./routers/jugadores'));

app.listen(port, () => {
    console.log('Server en:', port);
})