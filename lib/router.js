/*
 * Default router
 */
var XRegExp = require('./xregexp');

exports.route = function(handle) {
    return function (request, response, urlParams) {
        // this function is actually called from server, passing these 3 params

        if (urlParams.length && urlParams[0] === '') {
            urlParams.shift();
        }
        var pathname = urlParams.join('/');
        var nextUrlParams = pathname.split('/').slice(1);

        console.log("About to route in '" + __filename + "' a request for " + pathname);

        for (url in handle) {
            var regExpUrl = XRegExp(url);
            var matchedUrlRegex = regExpUrl.exec(pathname);
            if (matchedUrlRegex !== null) {
                console.log("handle this pathname: " + pathname + ' by url: ' + url)
                return choosedRoute(url, matchedUrlRegex);
            }
        }

        // runs if no matching
        console.log("No request handler found for " + url);
        response.writeHead(404);
        response.write('404 Not Found');
        response.end();

        function choosedRoute(url, matchedUrlRegex) {
            // given key from `urls` hash and forward right url chunk
            if (typeof handle[url] === 'function') {
                // handle this url & build named groups
                handle[url](request, response, matchedUrlRegex);

            } else if (typeof handle[url] === 'object') {
                // `urls` in current route.js points at nested router
                // call its method `route` and forward urlParams
                var pathname = matchedUrlRegex.input;
                var nextUrlParams = pathname.split('/').slice(1);
                handle[url].route(request, response, nextUrlParams);
            }
        }
    }
}

