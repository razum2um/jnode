var stdRouter = require("../lib/router.js");

var views = require("./views");

var urls = {
    "/": views.start,
    "start": views.start,
}

exports.route = stdRouter.route(urls);

