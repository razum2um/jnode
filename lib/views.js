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
        response.write('<script src="http://xregexp.com/xregexp-min.js"></script>');
        response.write('<script src="/media/js/hit.js"></script>');
        response.write('</head><body>');

        // let your view begin...
        realView(request, response, params, httpCb);

        function httpCb(err, strResp) {
            // .. and close query here
            // TODO: recieve here an Context obj & render it
            if (err) {
                throw new Error(err);
            }
            response.write(strResp);
            response.write('</body></html>');
            response.end();
        }
    }
}

exports.jsonView = function(realView) {
    return function(request, response, params) {
        // this function is actually called by router
        response.writeHead(200, {"Content-Type": "application/json"});

        // let your view begin...
        realView(request, response, params, jsonCb); // blocks here untill `realView` runs

        function jsonCb(err, jObj) {
            // .. and close query here
            if (err) {
                throw new Error(err);
            }
            response.write(JSON.stringify(jObj));
            response.end();
        }
    }
}
