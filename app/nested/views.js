// an ordinal views container 

exports.start = function(request, response, urlParams) {
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write("Request handler 'start' from '" + __filename + "' was called.");
  response.end();
  console.log("Request handler 'start' from '" + __filename + "' was called.");
}

