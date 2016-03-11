(function () {
    'use strict';

    angular
        .module('app')
        .factory('sheetMusicService', Service);

    function Service($http, $q) {
        var service = {};
        service.getBuffer = getBuffer;
        return service;

        function getBuffer(bufferName){
            //console.log(bufferName);
            return $http.get('/api/sheetMusic/'+bufferName).then(handleSuccess,handleError);
        }

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(res) {
            return $q.reject(res.data);
        }
    }
})();
