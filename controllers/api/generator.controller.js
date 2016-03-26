var config = require('config.json');
var express = require('express');
var busboy = require('connect-busboy');
var fs = require('fs-extra');
var router = express.Router();
var playService = require('services/generator.service');
//var sheetMusicService = require ('services/sheetMusic.service');
// routes
 var spawn = require('child_process');
 router.get('/generate', generate);
//router.put('/:_id', updateRecord);

module.exports = router;
function getBuffer(req, res) {
    var fstream;
    var readStream = fs.createReadStream("public/img/"+req.params.bufferName);
    ///console.log(readStream);
    // This will wait until; we know the readable stream is actually valid before piping
    readStream.on('open', function () {
    // This just pipes the read stream to the response object (which goes to the client)
    console.log("----------------");
    //console.log(res);
        readStream.pipe(res);

    });

    // This catches any errors that happen while creating the readable stream (usually invalid names)
    readStream.on('error', function(err) {
        console.log("error");
        res.end(err);
    });
}

function generate(req, res) {
    var filename = Date.time()+".mid";
  spawn.exec("th sample.lua beethoven.t7 -filename ../public/img/"+filename, function(error,stdout,stderr){
        if (error) {
                    console.log(error.stack);
                    console.log('Error code: '+error.code);
                    console.log('Signal received: '+error.signal);
                 }
                 console.log('stdout: ' + stdout);
                 console.log('stderr: ' + stderr);
                 return filename;

    });
    
}


