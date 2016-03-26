var config = require('config.json');
var express = require('express');
var busboy = require('connect-busboy');
var fs = require('fs-extra');
var router = express.Router();
var playService = require('services/play.service');
//var sheetMusicService = require ('services/sheetMusic.service');
// routes
router.get('/sheetMusic',getBuffer);
//router.get('/:bufferName', getBuffer);
//router.put('/:_id', updateRecord);

module.exports = router;
function getBuffer(req, res) {
    //var fstream;
    var readStream = fs.createReadStream("img/"+req.params.bufferName);
    //console.log(readStream);
    // This will wait until; we know the readable stream is actually valid before piping
    readStream.on('open', function () {
    // This just pipes the read stream to the response object (which goes to the client)
    //console.log("----------------");
    //console.log(res);
        readStream.pipe(response);

    });

    // This catches any errors that happen while creating the readable stream (usually invalid names)
    readStream.on('error', function(err) {
        console.log("error");
        res.end(err);
    });
}