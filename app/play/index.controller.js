(function () {
    'use strict';
    angular
        .module('app')
        .controller('Play.IndexController', Controller);
    function Controller(PlayService) {
        initController();
        function initController(){
            //display music files from database
            PlayService.getAll().then(function (records) {
                for(var record in records){
                    createAudioTag(records[record]);
                }
            });
        }

        function createAudioTag(record){
            var audio = document.createElement("AUDIO");
            audio.controls = true;
            var source = document.createElement("SOURCE");
            source.src = "play/"+record._name;
            source.type = "audio/mpeg"
            audio.appendChild(source);
            var newLine = document.createElement("BR");
            var showRecords = document.getElementById("showRecords");
            showRecords.appendChild(audio);
            showRecords.appendChild(newLine);
        }
    }
})();