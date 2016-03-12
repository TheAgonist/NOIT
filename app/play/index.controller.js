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
                var rank = 1;
                for(var record in records){
                    displayRecord(records[record], rank);
                    rank++;
                }
            });
        }

        function displayRecord(record, rank){
            var first = document.createElement("TD");
            first.innerHTML = rank;
            var second = document.createElement("TD");
            first.innerHTML = record.name;
            var second = document.createElement("TD");
            first.innerHTML = record.name;
            var row = document.createElement("TR");
            row.appendChild(first);
            row.appendChild(second);
            var table = document.getElementById("listRecords");
            table.appendChild(row);
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
            PlayService.upvote(record);
        }
    }
})();