var Product = require('../models/product.model');

module.exports = {
    get: function (req, res) {

        function callback(err, products) {
            if (err) {
                res.status(501);
                res.send("Internal Server Error");
            }
            else {
                res.status(200);
                res.json(products);
            }
        }

        Product.find({}, { __v: 0 }, callback);
    },

    getById: function (req, res) {
        var id = req.params.id;

        Product.findById(id, function (err, product) {
            if (product) {
                res.status(200);
                res.json(product);
            }
            else {
                res.status(404);
                res.send("Not found");
            }

        });

    },

    save: function (req, res) {
        var product = new Product(req.body);

        product.save(function (err) {
            if (!err) {
                res.status(201);
                res.send("Created");
            }
            else {
                res.status(501);
                res.send(err);
            }
        });
    },

    delete: function (req, res) {
        var id = req.params.id;

        Product.findByIdAndRemove(id, function (err) {
            if (!err) {
                res.status(204); //No content
                res.send("Deleted");
            }
            else {
                res.status(501);
                res.send("Internal Server Error");
            }
        });



    },

    update: function (req, res) {
        var id = req.params.id;

        var product = new Product(req.body);

        Product.findByIdAndUpdate(id, product, function (err) {
            if (!err) {
                res.status(200);
                res.send("Updated");
            }
            else {
                res.status(501);
                res.send("Internal Server Error");
            }
        });
    }
};
