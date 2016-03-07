(function () {
    'use strict';

    angular
        .module('app')
        .factory('UploadService', Service);

    function Service($http, $q) {
        var service = {};
        
        return service;

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(res) {
            return $q.reject(res.data);
        }
    }

})();
