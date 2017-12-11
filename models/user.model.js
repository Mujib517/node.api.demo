var mongoose = require('mongoose');

module.exports = mongoose.model("User", {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    lastUpdated: { type: Date, default: Date.now }
});