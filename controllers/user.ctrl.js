var User = require('../models/user.model');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

function UserCtrl() {

    this.register = function (req, res) {

        var encryptedPwd = bcrypt.hashSync(req.body.password, 2);
        req.body.password = encryptedPwd;
        var user = new User(req.body);
        user.save()
            .then(function () {
                res.status(201);
                res.send("Registered");
            })
            .catch(function () {
                res.status(500);
                res.send("Internal Server Error");
            });
    };

    this.login = function (req, res) {
        User.findOne({ username: req.body.username })
            .exec()
            .then(function (user) {
                var result = bcrypt.compareSync(req.body.password, user.password);
                if (result) {
                    var token = jwt.sign(user.username, 'secret');
                    res.status(200);
                    res.send({
                        username: user.username,
                        token: token
                    });
                }
                else {
                    res.status(401);
                    res.send("Wrong username or password");
                }
            })
            .catch(function () {
                res.status(401);
                res.send("Wrong username or password");
            })
    }
}

var userCtrl = new UserCtrl();
module.exports = userCtrl;