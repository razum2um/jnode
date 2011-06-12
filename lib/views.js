/*
 * Standart view-wrapper
 */

var util = require('util');

exports.basicView = function(realView) {
    return function(request, response, params) {
        // this function is actually called by router
        response.writeHead(200, {"Content-Type": "text/html"});
        var callback = function() {
            response.end();
        }
        realView(request, response, params, callback); // blocks here untill `realView` runs
        //console.log('strResponse=' + util.inspect(strResponse));
        // expects a string
        //response.write(strResponse); 
        //response.end();
    }
}
