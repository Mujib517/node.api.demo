var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var morgan = require('morgan');
var fs = require('fs');
var path = require('path');
var cors = require('cors');
//CI and CD : Continuous integration and Continuous delivery
// source --> Git --> bundle, minifying unit tests integration tests  --> heroku

var config = require('./config');
var defaultCtrl = require('./controllers/default.ctrl');
var productCtrl = require('./controllers/product.ctrl');
var productRouter = require('./routes/product.router');
var defaultRouter = require('./routes/default.router');
var userRouter = require('./routes/user.router');

var middlewares = require('./utilities/middlewares');

var app = express();

app.use(express.static('uploads/'));


var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Server is running on " + port);;
});

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'requests.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));


//Domain driven
mongoose.connection.openUri(config.conStr);
mongoose.Promise = global.Promise;

app.use(cors());
app.use(bodyParser.json());

app.use('/', defaultRouter);
app.use('/api/users', userRouter);



//app.use(middlewares.isAuthencticated);

app.use('/api/products', productRouter);

//basic
//token