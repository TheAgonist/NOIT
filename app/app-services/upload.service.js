(function () {
    'use strict';

    angular
        .module('app')
        .factory('UploadService', Service);

    function Service($http, $q) {
        var service = {};
        service.upload = upload;
        return service;

        function upload(record){
            console.log(record);
            return $http.post('/api/upload/post',record).then(handleSuccess, handleError);
        }

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(res) {
            return $q.reject(res.data);
        }
    }

})();
