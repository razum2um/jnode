// an ordinal views container 

var fs = require('fs');
var path = require('path');
var exec = require("child_process").exec;

var views = require('./lib/views');
var paperboy = require('./lib/paperboy');
var MPD = require('./mpd/mpd.js');

var util = require('util');

exports.start = views.httpView(function (request, response, params, next) {
  var body = '';
  body += '<p>Date = <span id="date"></span></p>';

  // TODO: send an Context obj here
  next(null, body);
});

/*
exports.retrospect = function (request, response) {
    setTimeout(function() {
        response.write(JSON.stringify({'resp':"Request handler 'retrospect' was called."}));
        response.end();
        console.log("Request handler 'retrospect' was called.");
    }, 1000);
}
*/

exports.ls = views.httpView(function (request, response, params, next) {
  exec("find / -type f | nl", 
    { timeout: 1000, maxBuffer: 2*1024 },
    function (error, stdout, stderr) {
        var resp = '<pre>' + stdout + '</pre>';
        next(null, resp);
        }
    );
});

exports.mpd = views.jsonView(function(request, response, params, next) {
    var mpd = new MPD();
    mpd.on('connect', function() {
        var title = '';
        var artist = '';

        mpd.send('currentsong', printSong);
        function printSong(currentSong) {
            console.log(util.inspect(currentSong));
            if (currentSong.Title !== undefined) {
                var jObj = { title: currentSong.Title };
                next(null, jObj);
            } else { 
                // the 4th attempt = volume
                mpd.send('currentsong', printSong);
            }
        };
        
    });
});

exports.media = function(request, response, params) {

    // log-closure
    function log(statCode, url, ip, err) {
      var logStr = statCode + ' - ' + url + ' - ' + ip;
      if (err)
        logStr += ' - ' + err;
      console.log(logStr);
    }
    // end log-closure
    
    // decided by routing
    // you setup
    //
    // "^media/.*": views.media
    //
    // and everything under MEDIA_PREFIX/media gets aviable
    var MEDIA_PREFIX = '.';  // relative root

    var pathChunks = [MEDIA_PREFIX];
    pathChunks = pathChunks.concat(params);
	var filePath = pathChunks.join('/');

    // TODO: check if exists & perms, as changed parepboy
    var ip = request.connection.remoteAddress;
    paperboy
    .deliver(filePath, request, response)
    .addHeader('Expires', 300)
    .addHeader('X-PaperRoute', 'Node')
    .before(function() {
      console.log('Received Request');
    })
    .after(function(statCode) {
      log(statCode, request.url, ip);
    })
    .error(function(statCode, msg) {
      response.writeHead(statCode, {'Content-Type': 'text/plain'});
      response.end("Error " + statCode);
      log(statCode, request.url, ip, msg);
    })
    .otherwise(function(err) {
      response.writeHead(404, {'Content-Type': 'text/plain'});
      response.end("Error 404: File not found");
      log(404, request.url, ip, err);
    });
}

exports.date = views.View(function(req, res, params, next) {

    var plus = '0';
    if (params.length && params.day !== undefined) {
        plus = params.day;
    }
    exec('sleep 1; date -R --date="' + plus + ' day"', execCb);
    function execCb(err, stdout, stderr) {
        if (req.headers['x-requested-with'] === 'XMLHttpRequest') {
            var resp = { date: stdout + ' (in ' + plus + ' day)'};
        } else {
            var resp = stdout + ' (in ' + plus + ' day)';
        }
        next(null, resp);
    }
});
