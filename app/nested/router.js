var stdRouter = require("../../lib/router");

var views = require("./views");

var urls = {
    "start": views.start,
    ".*": views.start,
}

exports.route = stdRouter.route(urls);

