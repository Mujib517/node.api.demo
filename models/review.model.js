var mongoose = require('mongoose');

module.exports = mongoose.model("Review", {
    productId: { type: String, required: true },
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    subject: { type: String },
    message: { type: String },
    lastUpdated: { type: Date, default: Date.now }
});