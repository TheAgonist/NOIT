(function () {
    'use strict';

    angular
        .module('app')
        .factory('UploadService', Service);

    function Service($http, $q) {
        var service = {};
        service.upload = upload;
        service.getAll = getAll;
        return service;

        function upload(record){
            console.log(record);
            return $http.post('/api/upload/post',record).then(handleSuccess, handleError);
        }

        function getAll(){
            //console.log("fffff");
            return $http.get('/api/upload/getRecords').then(handleSuccess, handleError);
        }

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(res) {
            return $q.reject(res.data);
        }
    }

})();
