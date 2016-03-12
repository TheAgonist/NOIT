(function () {
    'use strict';

    angular
        .module('app')
        .factory('generatorService', Service);

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
})();
