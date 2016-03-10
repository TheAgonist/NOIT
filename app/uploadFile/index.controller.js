(function () {
    'use strict';
    angular
        .module('app')
        .controller('Upload.IndexController', Controller);
    function Controller(UploadService) {
        initController();
        function initController(){
            UploadService.getAll().then(function (records) {
                console.log(records);
                for(var record in records){
                	console.log(records[record]);
                    displayRecord(records[record]);
                }
            });
            function displayRecord(record){
            var name = document.createElement("P");
            name.innerHTML = record.name;
            //var play = createPlayButton(record);
            var divContainer = document.createElement("DIV");
            divContainer.appendChild(name);
            //divContainer.appendChild(upvote);
            //divContainer.appendChild(play);
            divContainer.id = "row";
            var row = document.createElement("LI");
            row.appendChild(divContainer);
            var listRecords = document.getElementById("listRecords");
            listRecords.appendChild(row);
        }
        }
    }
})();
