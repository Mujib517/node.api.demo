var Product = require('../models/product.model');

module.exports = {
    get: function (req, res) {

        // var pageSize = req.params.pageSize ? +req.params.pageSize : 5;
        // var pageIndex = req.params.pageIndex ? +req.params.pageIndex : 0;
        // falsy: 0 false  null undefined NaN ""
        // truthy 
        var pageSize = +req.params.pageSize || 5;
        var pageIndex = +req.params.pageIndex || 0;

        Product.count()
            .exec()
            .then(function (cnt) {
                //deferred execution
                var query = Product.find();
                query.skip(pageIndex * pageSize);
                query.limit(pageSize);

                query.exec()
                    .then(function (products) {

                        var response = {
                            metadata: {
                                count: cnt,
                                pages: Math.ceil(cnt / pageSize)
                            },
                            data: products
                        };

                        res.status(200);
                        res.json(response);
                    })
                    .catch(function (err) {
                        res.status(500);
                        res.send("Internal Server Error");
                    });
            });


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
