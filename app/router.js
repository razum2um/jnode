var stdRouter = require("../lib/router.js");

var views = require("./views.js");

var urls = {
    "/": views.start,
    "start": views.start,
}

exports.route = stdRouter.route(urls);
