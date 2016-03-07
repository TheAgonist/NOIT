(function () {
    'use strict';
    angular
        .module('app')
        .controller('Upload.IndexController', Controller);
    function Controller(PlayService) {
        initController();
        function initController(){
            //display music files from database
        }

        function uploadFile(){
        	console.log("fff");
        }
    }
})();