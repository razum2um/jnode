var stdRouter = require("./lib/router");

var views = require("./views");
var appRouter = require("./app/router");

var urls = {
    "^$": views.start, // required definition "/"
    "^media/.*": views.media, // required media handler EXACT "^media/.*"
    "^app": appRouter, // optional give a nested router
    "^start/plus/(?<day>[0-9]+)/": views.start, // simple view-functions
    "^start": views.start, // simple view-functions

    "^upload": views.upload,
    "^retrospect": views.retrospect,
    "^ls": views.ls,
    "^mpd": views.mpd,
    "^date/plus/(?<day>[0-9]+)/": views.date,
    "^date": views.date,
}

// required, hardcoded for every `router`
// sad, but you MUST export & call function `route`
exports.route = stdRouter.route(urls); 

