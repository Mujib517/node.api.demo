var mongoose = require('mongoose');

var productModel = mongoose.model("Product", {
    brand: { type: String, required: true, minlength: 3, maxlength: 10 },
    model: { type: String, required: true },
    price: { type: Number, required: true },
    inStock: { type: Boolean, default: true },
    lastUpdated: { type: Date, default: Date.now },
    image: { type: String }
});

module.exports = productModel;


