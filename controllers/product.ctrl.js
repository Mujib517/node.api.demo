module.exports = {
    get: function (req, res) {

        var products = [
            { id: 1, brand: "Nokia", model: "N8", price: 100, inStock: true },
            { id: 2, brand: "Samsung", model: "S8", price: 1200, inStock: false },
            { id: 3, brand: "Apple", model: "IPhone X", price: 1300, inStock: false }
        ];

        res.json(products);
    }
};
