var stdRouter = require("../lib/router"); // required: this router is default

var nestedApp = require("./nested/router");
var views = require("./views");

var urls = {
    "^nested": nestedApp,  // optional: function, which is defined into nested app, 
                          //which is given there an urls-Object
    "^start": views.start,
    "^$": views.start, // required: function, which handles this route "/app/"
}

exports.route = stdRouter.route(urls); // required: defition & export of `route` from this scope
