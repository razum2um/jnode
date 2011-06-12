var url = require("url");
var handlers = require("./handlers");

var handle = {
    "/": handlers.start,
    "start": handlers.start,
    "upload": handlers.upload,
    "retrospect": handlers.retrospect,
    "ls": handlers.ls,
    "mpd": handlers.mpd,
    "media": handlers.media,
}

function route(request, response) {
  var pathname = url.parse(request.url).pathname;
  var nextRouter = pathname.split('/')[1];
  var params = pathname.split('/').slice(2);
  if (nextRouter == "") {
      nextRouter = "/"; // hack to handle `null` level
  }
  console.log("About to route a request for " + pathname + " decided for " + nextRouter);
  if (typeof handle[nextRouter] === 'function') {
        handle[nextRouter](request, response, params);
  } else  {
        response.writeHead(404);
        response.end();
        console.log("No request handler found for " + pathname);
  }
}

exports.route = route;
