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
                //console.log(records);
                for(var record in records){
                    displayRecord(records[record]);
                }
            });
        }

        function displayRecord(record){
            var name = document.createElement("P");
            name.innerHTML = record.name;
            var upvote = createUpvoteButton(record);
            var play = createPlayButton(record);
            var divContainer = document.createElement("DIV");
            divContainer.appendChild(name);
            divContainer.appendChild(upvote);
            divContainer.appendChild(play);
            divContainer.id = "row";
            var row = document.createElement("LI");
            row.appendChild(divContainer);
            var listRecords = document.getElementById("listRecords");
            listRecords.appendChild(row);
        }
        function createUpvoteButton(record){
            var upvote = document.createElement("BUTTON");
            upvote.id = "upvoteButton";
            upvote.onclick = function() {
                upvoteFunc(record);
                 };
            upvote.innerHTML = "UPVOTE";
            return upvote;
            
        }
        function createPlayButton(record){
            var play = document.createElement("BUTTON");
            play.id = "playButton";
            play.onclick = function() {
                createAudioTag(record);
                 };
            play.innerHTML = "PLAY";
            return play;
            
        }
        function createAudioTag(record){
            var audio = document.createElement("AUDIO");
            audio.controls = true;
            var source = document.createElement("SOURCE");
            source.src = "play/"+record._name;
            source.type = "audio/mpeg"
            audio.appendChild(source);
            var row = document.getElementById("row");
            row.appendChild(audio);
        }


        function upvoteFunc(record){
            //console.log(record);
            PlayService.upvote(record);
        }
    }
})();