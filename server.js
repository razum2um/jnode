var http = require("http");
var url = require("url");

function start(router) {
  function onRequest(request, response) {
    console.log("Request received.");
    var urlParams = url.parse(request.url).pathname.split('/');
    router.route(request, response, urlParams);
  }

  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}

exports.start = start;
