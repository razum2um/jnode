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
        realView(request, response, params, jsonCb); 

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

exports.View = function(realView) {
    return function(request, response, params) {
        // this function is actually called by router

        // let your view begin...
        realView(request, response, params, viewCb);

        function viewCb(err, resp) {
            // .. and close query here
            if (err) {
                throw new Error(err);
            }
            if (typeof resp === 'string') {
                // make html answer
                response.writeHead(200, {"Content-Type": "text/html"});
                response.write(resp);
                response.end();
            } else {
                if (request.headers['x-requested-with'] === 'XMLHttpRequest') {
                    // make json answer
                    response.writeHead(200, {"Content-Type": "application/json"});
                    response.write(JSON.stringify(resp));
                    response.end();
                } else {
                    // TODO:
                    // recieved ContextObj, render it
                }
            }
        }
    }
}
