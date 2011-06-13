/*
 * Standart view-wrapper
 */

var util = require('util');

exports.httpView = function(realView) {
    return function(request, response, params) {
        // this function is actually called by router
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write('<html><head>');
        response.write('<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js"></script>');
        response.write('<script src="/media/js/hit.js"></script>');
        response.write('</head><body>');
        function httpCb(err, strResp) {
            if (err) {
                throw Error(err);
            }
            response.write(strResp);
            response.write('</body></html>');
            response.end();
        }
        realView(request, response, params, httpCb); // blocks here untill `realView` runs
    }
}

exports.jsonView = function(realView) {
    return function(request, response, params) {
        // this function is actually called by router
        response.writeHead(200, {"Content-Type": "application/json"});
        function jsonCb(err, jObj) {
            if (err) {
                throw Error(err);
            }
            response.write(JSON.stringify(jObj));
            response.end();
        }
        realView(request, response, params, jsonCb); // blocks here untill `realView` runs
    }
}
