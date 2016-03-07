(function () {
    'use strict';
    //inject angular file upload directives and services.
	angular
		.module('app')
		.controller('MainController', controller) 
			
	function controller ($scope, $upload) {
	 
		$scope.uploadFile = function(){
		 
		 $scope.fileSelected = function(files) {
		     if (files && files.length) {
		        $scope.file = files[0];
		     }
		 
		     $upload.upload({
		       url: '/api/upload', //node.js route
		       file: $scope.file
		     })
		     .success(function(data) {
		       console.log(data, 'uploaded');
		      });
		 
		    };
		};
	};
})();