var express = require('express');
var bodyParser = require('body-parser');

var defaultCtrl = require('./controllers/default.ctrl');
var productCtrl = require('./controllers/product.ctrl');
var productRouter = require('./routes/product.router');
var defaultRouter = require('./routes/default.router');

var app = express();

app.listen(3000, function () {
    console.log("Server is running on 3000");;
});

app.use(bodyParser.json());

app.use('/', defaultRouter);
app.use('/api/products', productRouter);
