var Product = require('../models/product.model');
var Review = require('../models/review.model');
var logger = require('../utilities/logger');


module.exports = {
    get: function (req, res) {
        var pageSize = +req.params.pageSize || 10;
        var pageIndex = +req.params.pageIndex || 0;
        var count;

        //deferred execution
        var query = Product
            .find()
            .sort("-lastUpdated")
            .skip(pageIndex * pageSize)
            .limit(pageSize);

        Product.count()
            .exec()
            .then(function (cnt) {
                logger.debug("Fetched count from databae");
                count = cnt;
                return query.exec();
            })
            .then(function (products) {

                for (var i = 0; i < products.length; i++) {
                    if (products[i].image)
                        products[i].image = req.protocol + "://" + req.get('host') + "/" + products[i].image;
                }

                var response = {
                    metadata: {
                        count: count,
                        pages: Math.ceil(count / pageSize)
                    },
                    data: products
                };

                res.status(200);
                res.json(response);
            })
            .catch(function (err) {
                res.status(500);
                logger.error(err);
                res.send("Internal Server Error");
            });
    },

    getById: function (req, res) {
        var id = req.params.id;

        Product.findById(id, function (err, product) {
            if (product) {
                Review.find({ productId: id })
                    .exec()
                    .then(function (reviews) {
                        var jsonProduct = product.toJSON();
                        jsonProduct.reviews = reviews;

                        Review.aggregate(
                            [
                                { $match: { productId: id } },
                                { $group: { _id: '$productId', avgRating: { $avg: '$rating' } } }
                            ]
                        ).then(function (result) {
                            if (result && result.length > 0)
                                jsonProduct.avgRating = result[0].avgRating;
                            res.status(200);
                            res.json(jsonProduct);
                        });
                    });
            }
            else {
                res.status(404);
                res.send("Not found");
            }

        });

    },

    save: function (req, res) {
        var product = new Product(req.body);

        product.save(function (err, product) {
            if (!err) {
                res.status(201);
                res.json(product);
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
