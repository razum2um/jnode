exports.start = function (request, response, params) {
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write("Request handler 'start' from 'app' was called.");
  response.end();
  console.log("Request handler 'start' was called.");
}

