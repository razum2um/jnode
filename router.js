var url = require("url");
var handlers = require("./handlers");

var handle = {
    "/": handlers.start,
    "/start": handlers.start,
    "/upload": handlers.upload,
    "/retrospect": handlers.retrospect,
    "/ls": handlers.ls,
    "/mpd": handlers.mpd,
}

function route(request, response) {
  var pathname = url.parse(request.url).pathname;
  console.log("About to route a request for " + pathname);
  if (typeof handle[pathname] === 'function') {
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write('<head><script src="http://code.jquery.com/jquery-1.6.1.min.js"></script></head>');
        handle[pathname](request, response);
  } else  {
        response.writeHead(404, {"Content-Type": "text/html"});
        response.end();
        console.log("No request handler found for " + pathname);
  }
}

exports.route = route;
