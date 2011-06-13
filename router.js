var stdRouter = require("./lib/router");

var views = require("./views");
var appRouter = require("./app/router");

var urls = {
    "/": views.start,
    "start": views.start,
    "upload": views.upload,
    "retrospect": views.retrospect,
    "ls": views.ls,
    "mpd": views.mpd,
    "media": views.media,
    "date": views.date,
    "app": appRouter.route,
}

exports.route = stdRouter.route(urls);

