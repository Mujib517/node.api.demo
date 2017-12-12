var jwt = require('jsonwebtoken');
var config = require('../config');

//magic strings anti pattern
module.exports = {

    isAuthencticated: function (req, res, next) {
        jwt.verify(req.headers["authorization"], config.privateKey, function (err, data) {
            if (data) next();
            else {
                res.status(401);
                res.send("Unathorized");
            }
        });
    }
};

