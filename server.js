var http = require("http");
var url = require("url");

function start(router) {
  function onRequest(request, response) {
    console.log("Request received.");
    var urlParams = url.parse(request.url).pathname.split('/');
    router.route(request, response, urlParams);
  }

  http.createServer(onRequest).listen(8000);
  console.log("Server has started at http://127.0.0.1:8000");
}

exports.start = start;
