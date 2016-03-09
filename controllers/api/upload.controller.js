var config = require('config.json');
var express = require('express');
var router = express.Router();
var uploadService = require('services/upload.service');
// routes
router.post('/post', upload);

module.exports = router;

function upload(req, res) {
        console.log(req);
    uploadService.create(req.body)
    .then(function () {
        res.sendStatus(200);
    })
    .catch(function (err) {
        res.status(400).send(err);
    });
}