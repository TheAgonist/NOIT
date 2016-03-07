var config = require('config.json');
var express = require('express');
var router = express.Router();
var playService = require('services/play.service');
// routes
router.get('/all', getAllRecords);
router.put('/:_id', updateRecord);

module.exports = router;
function getAllRecords(req, res) {
    playService.getAll()
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

function updateRecord(req, res) {
    //console.log(req);
    var recordId = req.body._id;
        //console.log(req.body);
       playService.update(recordId, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}