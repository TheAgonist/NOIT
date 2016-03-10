var config = require('config.json');
var mongo = require('mongodb');
var monk = require('monk');
var db = monk(config.connectionString);
var recordsDb = db.get('records');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');

var service = {};

service.create = createRecord;
service.get = getAllRecordsForUser;

module.exports = service;

    function createRecord(record) {
        var deferred = Q.defer();
        recordsDb.insert(
            record,
            function (err, doc) {
                if (err) deferred.reject(err);

                deferred.resolve();
            });

    return deferred.promise;
}

    function getAllRecordsForUser(user) {
        var deferred = Q.defer();
 		//console.log(userParams);
        recordsDb.find({userId: user},{sort : { votes : -1 } },function (err, record) {
        if (err) deferred.reject(err);
        if (record) {
        	//console.log(record);
            deferred.resolve(record);
        } else {
            deferred.resolve();
        }
    });
        //console.log(deferred.promise);
    return deferred.promise;
}