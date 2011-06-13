var stdRouter = require("./lib/router");

var views = require("./views");
var appRouter = require("./app/router");

var urls = {
    "^app": appRouter, // optional give a nested router
    "^start": views.start, // simple view-functions
    "^upload": views.upload,
    "^retrospect": views.retrospect,
    "^ls": views.ls,
    "^mpd": views.mpd,
    "^media/.*": views.media,
    "^date": views.date,
    "^$": views.start, // required definition "/"
}

// required, hardcoded for every `router`
// sad, but you MUST export & call function `route`
exports.route = stdRouter.route(urls); 

