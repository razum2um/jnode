var stdRouter = require("../lib/router"); // required: this router is default

var nestedApp = require("./nested/router");
var views = require("./views");

var urls = {
    "/": views.start, // required: function, which handles this route "/app/"
    "start": views.start,
    "nested": nestedApp,  // optional: function, which is defined into nested app, 
                          //which is given there an urls-Object
}

exports.route = stdRouter.route(urls); // required: defition & export of `route` from this scope
