var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


var defaultCtrl = require('./controllers/default.ctrl');
var productCtrl = require('./controllers/product.ctrl');
var productRouter = require('./routes/product.router');
var defaultRouter = require('./routes/default.router');

var app = express();

app.use(express.static('uploads/'));

app.listen(3000, function () {
    console.log("Server is running on 3000");;
});
//Domain driven
mongoose.connection.openUri("mongodb://localhost/ecommerce");
mongoose.Promise = global.Promise;

app.use(bodyParser.json());

app.use('/', defaultRouter);

function isAuthenticated(req, res, next) {
    if (req.headers["username"] === 'admin' && req.headers["password"] === 'admin') next();
    else {
        res.status(401);
        res.send("Unauthorized");
    }
}

app.use(isAuthenticated);

app.use('/api/products', productRouter);

//basic
//token