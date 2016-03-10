var config = require('config.json');
var express = require('express');
var router = express.Router();
var uploadService = require('services/upload.service');
// routes
router.post('/post', upload);
router.get('/getRecords',getRecordsForUser)

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

function getRecordsForUser(req, res) {
        //console.log(req.user.sub);
    uploadService.get(req.user.sub)
    .then(function (records) {
            if (records) {
                res.send(records);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}