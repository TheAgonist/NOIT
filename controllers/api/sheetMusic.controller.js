var config = require('config.json');
var express = require('express');
var busboy = require('connect-busboy');
var fs = require('fs-extra');
var toArrayBuffer = require('to-arraybuffer'); 
var router = express.Router();
var playService = require('services/play.service');
//var sheetMusicService = require ('services/sheetMusic.service');
// routes
router.get('/:bufferName',getBuffer);
//router.get('/:bufferName', getBuffer);
//router.put('/:_id', updateRecord);

module.exports = router;
function getBuffer(req, res) {
    //var fstream;
    var readStream = fs.readFile("public/img/"+req.params.bufferName,function(err,data){
        res.send(data);
    });
    /*var readStream = fs.createReadStream("public/img/"+req.params.bufferName);
    //console.log(readStream);
    // This will wait until; we know the readable stream is actually valid before piping
    readStream.on('open', function () {
        readStream.pipe(res);
    });
    readStream.on('end', function () {
        readStream.end(res);
    });*/
}