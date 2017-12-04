//in memory
var products = [
    { id: 1, brand: "Nokia", model: "N8", price: 100, inStock: true },
    { id: 2, brand: "Samsung", model: "S8", price: 1200, inStock: false },
    { id: 3, brand: "Apple", model: "IPhone X", price: 1300, inStock: false }
];


//Status codes
// 1xx  = Pending
// 2xx  == Success  200, 201, 204 
// 3xx  = Redirects
// 4xx  = Client Errors 401, 404
// 5xx  = Server Errors  501 500 

module.exports = {
    get: function (req, res) {
        res.json(products);
    },

    getById: function (req, res) {

        //==
        //===
        var id = +req.params.id;

        var product;
        for (var i = 0; i < products.length; i++) {
            if (products[i].id === id)
                product = products[i];
        }

        if (product) {
            res.status(200);
            res.send(product);
        }

        else {
            res.status(404);
            res.send("Not found");
        }
    },

    save: function (req, res) {
        var product = req.body;
        products.push(product);
        res.status(201); //Created
        res.send("Created");
    },

    delete: function (req, res) {
        var id = +req.params.id;

        for (var i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                products.splice(i, 1);
                break;
            }
        }

        res.status(204); //No content
        res.send("Deleted");
    },

    update: function (req, res) {
        var id = +req.params.id;
        var product = req.body;

        for (var i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                products[i].brand = product.brand;
                products[i].model = product.model;
                products[i].price = product.price;
                products[i].inStock = product.inStock;
            }
        }

        res.status(200);
        res.send("Updated");
    }

};
