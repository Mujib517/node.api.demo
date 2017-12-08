var Review = require('../models/review.model');

module.exports = {

    save: function (req, res) {
        var revieiw = new Review(req.body);
       
        revieiw.save()
            .then(function (review) {
                res.status(201);
                res.json(review);
            })
            .catch(function (err) {
                res.status(501);
                res.send("Internal Server Error");
            })
    }
}