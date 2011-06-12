/*
 * Standart view-wrapper
 */

exports.basicView = function(realView) {
    return function(request, response, params) {
        // this function is actually called by router
        response.writeHead(200, {"Content-Type": "text/html"});
        var strResponse = realView(request, params); // blocks here untill `realView` runs
        // expects a string
        response.write(strResponse); 
        response.end();
    }
}
