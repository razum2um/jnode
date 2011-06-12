/*
 * Default router
 */
var path = require('path');

exports.route = function(handle) {
    return function (request, response, urlParams) {
        if (urlParams[0] !== '') {
            var pathChunks = ['']; // used on the second level
        } else {
            var pathChunks = []; // on the 1st level we have params = ['', 'media' ...]
        }
        pathChunks = pathChunks.concat(urlParams);
        var pathname = pathChunks.join('/');
        var nextRouter = pathname.split('/')[1];
        var nextUrlParams = pathname.split('/').slice(2);
        if (nextRouter == "") {
            nextRouter = "/"; // hack to handle `null` level
        }
        console.log("About to route in '" + path.resolve('.') + "' a request for " + pathname + " decided for " + nextRouter);
        if (typeof handle[nextRouter] === 'function') {
            handle[nextRouter](request, response, nextUrlParams);
        } else  {
            response.writeHead(404);
            response.end();
            console.log("No request handler found for " + pathname);
        }
    }
}


