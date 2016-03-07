(function () {
    'use strict';

    angular
        .module('app')
        .factory('PlayService', Service);

    function Service($http, $q) {
        var service = {};
        service.getAll = getAll;
        service.uploadMusic = uploadMusic;
        return service;

        function getAll() {
            return $http.get('/api/play/all').then(handleSuccess, handleError);
        }

        function uploadMusic(){
            console.log("service");
        }

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(res) {
            return $q.reject(res.data);
        }
    }

})();
