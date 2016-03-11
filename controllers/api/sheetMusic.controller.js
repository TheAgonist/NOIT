var config = require('config.json');
var express = require('express');
var busboy = require('connect-busboy');
var fs = require('fs-extra');
var router = express.Router();
var playService = require('services/play.service');
// routes
router.get('/:bufferName', getBuffer);
//router.put('/:_id', updateRecord);

module.exports = router;
function getBuffer(req, res) {
    var fstream;
    readStream = fs.createReadStream("public/img/"+req.params.bufferName);

    // This will wait until we know the readable stream is actually valid before piping
    readStream.on('open', function () {
    // This just pipes the read stream to the response object (which goes to the client)
    readStream.pipe(res);
    });

    // This catches any errors that happen while creating the readable stream (usually invalid names)
    readStream.on('error', function(err) {
    res.end(err);
    });
}