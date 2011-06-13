// an ordinal views container 

var fs = require('fs');
var path = require('path');
var util = require('util');
var exec = require("child_process").exec;

var View = require('./lib/views');
var MPD = require('./mpd/mpd.js');

exports.start = function(request, response, params) {
    var view = new View(request, response, params, function(response) {
        console.log("Request handler 'start' was called.");
        response.write("Request handler 'start' was called.");
    });
    //console.log(view()());
}

/*
exports.upload = views.basicView(function (request, response, params, callback) {
    response.write('<head><script src="http://code.jquery.com/jquery-1.6.1.min.js"></script></head>');
    response.write("Request handler 'upload' was called.");
    callback(request, response, params);
});

exports.retrospect = views.basicView(function (request, response, params, callback) {
    var onTimeout = function() {
        response.write(JSON.stringify({'resp':"Request handler 'retrospect' was called."}));
        callback(request, response, params);
    }
    setTimeout(onTimeout, 10000);
});

exports.ls = views.basicView(function (request, response, params, callback) {
    var execDone = function (error, stdout, stderr) {
        response.write('<pre>' + stdout + '</pre>');
        callback(request, response, params);
    }
    exec("find / -type f | nl", { maxBuffer: 2000*1024 }, execDone);
});

exports.mpd = views.basicView(function(request, response, params, callback) {
    var mpd = new MPD();
    mpd.on('connect', function() {
        var title = '';
        var artist = '';

        mpd.send('currentsong', function(cs) {
          response.write("Now playing: " + cs.Title + " by " + cs.Artist);
          callback(request, response, params);
        });
        
        mpd.on('Title', function(t) {
          title = t;
        });
        
        mpd.on('Artist', function(a) {
          artist = a;
        });
        //
        
        mpd.on('time', function(time) {    
          var secs = time.split(':')[0];
          var total = time.split(':')[1];
          
          var state = artist + ' - ' + title + ' / at: ' + (secs) + ' - total: ' + (total);
          console.log(state);

          response.writeHead(200, {"Content-Type": "text/html"});
          response.write('<head><script src="http://code.jquery.com/jquery-1.6.1.min.js"></script></head>');
          response.write(state);
          response.end();
        });
        //
    });
});
*/

exports.media = function(request, response, params) {

    var pathChunks = ['.'];
    pathChunks = pathChunks.concat(params);
	var filePath = pathChunks.join('/');
    console.log('request filePath: ' + filePath);

	var extname = path.extname(filePath);
	var contentType = 'text/html';
	switch (extname) {
		case '.js':
			contentType = 'text/javascript';
			break;
		case '.css':
			contentType = 'text/css';
			break;
	}
	
	path.exists(filePath, function(exists) {
	
		if (exists) {
			fs.readFile(filePath, function(error, content) {
				if (error) {
					response.writeHead(500);
					response.end();
				}
				else {
					response.writeHead(200, { 'Content-Type': contentType });
					response.end(content, 'utf-8');
				}
			});
		}
		else {
			response.writeHead(404);
			response.end();
		}
	});
}
