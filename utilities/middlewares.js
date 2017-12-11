var jwt = require('jsonwebtoken');

module.exports = {

    isAuthencticated: function (req, res, next) {
        jwt.verify(req.headers["authorization"], "secret", function (err, data) {
            if (data) next();
            else {
                res.status(401);
                res.send("Unathorized");
            }
        });
    }
};

