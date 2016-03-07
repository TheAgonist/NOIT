var config = require('config.json');
var mongo = require('mongodb');
var monk = require('monk');
var db = monk(config.connectionString);
var recordsDB = db.get('records');
var Q = require('q');
var _ = require('lodash');

var service = {};
service.getAll = getAll;
module.exports = service;

function getAll(_id){
    var deferred = Q.defer();

    recordsDB.find(_id,function (err, record) {
        if (err) deferred.reject(err);
        if (record) {
            // return user (without hashed password)
            deferred.resolve(_.omit(record, 'hash'));
        } else {
            // user not found
            deferred.resolve();
        }
    });

    return deferred.promise;
}