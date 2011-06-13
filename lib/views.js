/*
 * Standart view-wrapper
 */

var util = require('util');

function View(request, response, params, handler) {
    this.request = request;
    this.response = response;
    this.params = params;
    this.handler = function() {
        var f = handler;
        var that = this;
        return function() {
            f(that.response); that.stopRender();
        }
    }
    //console.log(this.handler(response)());
    this.render();
    return this.handler;
};

View.prototype = {
    request: null,
    response: null,
    params: null,
    handler: null,

    render: function() {
       var self = this;       
       self.startRender();
       return self.handler(self.response)();
    },
    startRender: function() {
        var self = this;
        self.response.writeHead(200, {"Content-Type": "text/html"});
    },
    stopRender: function() {
        var self = this;
        self.response.end();
    }
};

module.exports = View;
