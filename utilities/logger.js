var bunyan = require('bunyan');
var log = bunyan.createLogger({
    name: "myapp",
    streams: [{
        level: 'error',
        path: 'app-error.log'
    }, {
        level: 'debug',
        path: 'debug.log'
    }, {
        level: 'info',
        path: 'app.log'
    }]
});

module.exports = log;