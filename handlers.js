var exec = require("child_process").exec;
var MPD = require('./lib/mpd.js');

exports.start = function (request, response) {
  response.write("Request handler 'start' was called.");
  response.end();
  console.log("Request handler 'start' was called.");
}

exports.upload = function (request, response) {
  response.write("Request handler 'upload' was called.");
  response.end();
  console.log("Request handler 'upload' was called.");
}

exports.retrospect = function (request, response) {
    setTimeout(function() {
        response.write(JSON.stringify({'resp':"Request handler 'retrospect' was called."}));
        response.end();
        console.log("Request handler 'retrospect' was called.");
    }, 1000);
}

exports.ls = function (request, response) {
  exec("find / -type f | nl", 
    { timeout: 1000, maxBuffer: 20000*1024 },
    function (error, stdout, stderr) {
      response.write('<pre>');
      response.write(stdout);
      response.write('</pre>');
      response.end();
  });
}

exports.mpd = function(request, response) {
    var mpd = new MPD();
    mpd.on('connect', function() {
        var title = '';
        var artist = '';

        mpd.send('currentsong', function(cs) {
          console.log(cs);
        });
        
        mpd.on('Title', function(t) {
          title = t;
        });
        
        mpd.on('Artist', function(a) {
          artist = a;
        });
        
        mpd.on('time', function(time) {    
          var secs = time.split(':')[0];
          var total = time.split(':')[1];
          
          var state = artist + ' - ' + title + ' / at: ' + (secs) + ' - total: ' + (total);
          console.log(state);
          response.write(state);
          response.end();
          mpd.close();
        });
    });
}

