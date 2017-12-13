var logger = require('../utilities/logger');

var defaultCtrl = {

    get: function (req, res) {
        logger.info({ message: "Request comes" });
        res.send("Hello Express");
        logger.error({ message: "Error" });
    },

    health: function (req, res) {
        var response = { status: "Up" };
        res.json(response);
    }
};

module.exports = defaultCtrl;