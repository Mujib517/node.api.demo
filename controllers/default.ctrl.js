
var defaultCtrl = {

    get: function (req, res) {
        res.send("Hello Express");
    },

    health: function (req, res) {
        var response = { status: "Up" };
        res.json(response);
    }
};

module.exports = defaultCtrl;