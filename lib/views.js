/*
 * Standart view-wrapper
 */

var util = require('util');

exports.httpView = function(realView) {
    return function(request, response, params) {
        // this function is actually called by router
        response.writeHead(200, {"Content-Type": "text/html"});
        var cb = function(err) {
            if (err!==undefined) {
                throw Error(err);
            }
            response.end();
        }
        realView(request, response, params, cb); // blocks here untill `realView` runs
    }
}
