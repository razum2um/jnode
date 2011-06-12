/*
 * Standart view-wrapper
 */


exports.basicView = function(realView) {
    return function(request, response, params) {
        // this function is actually called by router
        response.writeHead(200, {"Content-Type": "text/html"});
        var callback = function(request, response, params) {
            response.end();
        }
        realView(request, response, params, callback); 
    }
}
