(function () {
    'use strict';

    angular
        .module('app')
        .factory('generatorService', Service);
         var spawn = require('child_process');
    function Service($http, $q) {
        var service = {};
        service.getBuffer = getBuffer;
        service.song = null;
        return service;

        function getBuffer(bufferName){
            //console.log(bufferName);
            $http.get('/api/sheetMusic/'+bufferName).then(handleSuccess,handleError).then(function(song){
                //console.log(song);
                return song;
            });
            //console.log(contra);
            //return contra;
        }

        function handleSuccess(res) {
            //console.log(res.data);
            //$scope.Buffer = res.data;
            service.song = res.data;   
            return res.data;
        }

        function handleError(res) {
            return $q.reject(res.data);
        }
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
})();
