var Product = require('../models/product.model');

module.exports = {
    get: function (req, res) {
        var pageSize = +req.params.pageSize || 5;
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
                res.send(err);
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

        console.log('product ', product);

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
