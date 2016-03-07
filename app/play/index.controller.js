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
            var audioDiv = document.createElement("DIV");
            var audio = document.createElement("AUDIO");
            audio.controls = true;
            var source = document.createElement("SOURCE");
            source.src = "play/"+record._name;
            source.type = "audio/mpeg"
            audio.appendChild(source);
            var newLine = document.createElement("BR");
            var upvote = document.createElement("BUTTON");
            upvote.id = "upvoteButton";
            upvote.onclick = function() {
                                            upvoteFunc(record);
                                        };
            upvote.innerHTML = "UPVOTE";
            var showRecords = document.getElementById("showRecords");
            audioDiv.appendChild(audio);
            audioDiv.appendChild(upvote);
            showRecords.appendChild(audioDiv);
            showRecords.appendChild(newLine);
        }


        function upvoteFunc(record){
            //console.log(record);
            PlayService.upvote(record);
        }
    }
})();