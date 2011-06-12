/*
 * Default router
 */

exports.route = function(handle) {
    return function (request, response, urlParams) {
        // this function is actually called from server, passing these 3 params

        if (urlParams[0] !== '') {
            var pathChunks = ['']; // used on the second level
        } else {
            var pathChunks = []; // on the 1st level we have params = ['', 'media' ...]
        }
        pathChunks = pathChunks.concat(urlParams);
        var nextRouter = pathChunks[1];
        var nextUrlParams = pathChunks.slice(2);
        if (nextRouter == "") {
            nextRouter = "/"; // hack to handle `null` level
        }
        console.log("About to route in '" + __filename + "' a request for " + request.url + " decided for " + nextRouter);
        if (typeof handle[nextRouter] === 'function') {
            handle[nextRouter](request, response, nextUrlParams);
        } else  {
            response.writeHead(404);
            response.end();
            console.log("No request handler found for " + request.url);
        }
    }
}


