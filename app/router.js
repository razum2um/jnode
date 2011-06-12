var stdRouter = require("../lib/router");

var nestedApp = require("./nested/router");
var views = require("./views");

var urls = {
    "/": views.start,
    "start": views.start,
    "nested": nestedApp.route,
}

exports.route = stdRouter.route(urls);

