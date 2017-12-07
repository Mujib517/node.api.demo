var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var defaultCtrl = require('./controllers/default.ctrl');
var productCtrl = require('./controllers/product.ctrl');
var productRouter = require('./routes/product.router');
var defaultRouter = require('./routes/default.router');

var app = express();

app.listen(3000, function () {
    console.log("Server is running on 3000");;
});
//Domain driven
mongoose.connection.openUri("mongodb://localhost/ecommerce");
mongoose.Promise = global.Promise;

app.use(bodyParser.json());

app.use('/', defaultRouter);
app.use('/api/products', productRouter);
