/*
 * Default router
 */
var XRegExp = require('./xregexp');

exports.route = function(handle) {
    return function (request, response, urlParams) {
        // this function is actually called from server, passing these 3 params

        /*
        if (urlParams[0] !== '') {
            var pathChunks = []; // used on the second level
        } else {
            var pathChunks = []; // on the 1st level we have params = ['', 'media' ...]
        }
        pathChunks = pathChunks.concat(urlParams);
        console.log("urlParams: " + urlParams);
        */
        if (urlParams.length && urlParams[0] === '') {
            urlParams.shift();
        }
        var pathname = urlParams.join('/');
        //var nextRouter = pathname === '' ? '' : pathname.split('/')[1]; // first slashed "word" == key in `urls`
        var nextUrlParams = pathname.split('/').slice(1);
        /*
        if (nextRouter == "") {
            nextRouter = ""; // hack to handle `null` level - the very site-root
        }*/

        console.log("About to route in '" + __filename + "' a request for " + pathname);

        for (url in handle) {
            var regExpUrl = XRegExp(url);
            var matchUrl = regExpUrl.exec(pathname);
            if (matchUrl !== null) {
                console.log("handle this pathname: " + pathname + ' by url: ' + url)
                return choosedRoute(url, nextUrlParams);
            }
        }

        // runs if no matching
        console.log("No request handler found for " + url);
        response.writeHead(404);
        response.write('404 Not Found');
        response.end();

        function choosedRoute(url, nextUrlParams) {
            // given key from `urls` hash and forward right url chunk
            if (typeof handle[url] === 'function') {
                // handle this url & build named groups

                //console.log("handle this url: " + url + ' and fire: ' + handle[url]);
                handle[url](request, response, nextUrlParams);

            } else if (typeof handle[url] === 'object') {
                // `urls` in current route.js points at nested router
                // call its method `route` and forward urlParams

                //console.log("handle this url: " + url + ' and forward to: ' + handle[url]);
                handle[url].route(request, response, nextUrlParams);
            }
        }
    }
}

