(function () {
    'use strict';
    angular
        .module('app')
        .controller('sheetMusic.IndexController', Controller);
    function Controller(sheetMusicService, $scope) {
        initController();
        function initController(){
          //console.log(songs);
          var songs = sheetMusicService.getBuffer('Metallica-FadeToBlack.mid').then(function(response){
            console.log(Object.prototype.toString.call(response.data));
            //var ab = toArrayBuffer(response.data);
            /*var buf = new ArrayBuffer(response.data.length*2);
            var bufView = new Uint16Array(buf);
            //console.log(response.data.toString());
            for (var i=0, strLen = (response.data.length/100); strLen; i++) {
              //console.log(response.data.charCodeAt());
              bufView[i] = response.data.charCodeAt(i);
            }*/

          var string = btoa(unescape(encodeURIComponent(response.data))),
              charList = string.split(''),
              uintArray = [];
          for (var i = 0; i < charList.length; i++) {
              uintArray.push(charList[i].charCodeAt(0));
          }

            console.log(Object.prototype.toString.call(stringToUint(response.data)));
            readMidi(stringToUint(response.data));
            //$scope.buffer = data;
          });
          //console.log($scope.buffer);
          /*var buf = new ArrayBuffer(songs.length*2);
          var bufView = new Uint16Array(buf);*/
          /*for (var i=0, strLen=songs.length; i &lt; strLen; i++) {
            //bufView[i] = songs.charCodeAt(i);
          }*/

          
          
      	  var canvas = $("canvas")[0];
          var renderer = new Vex.Flow.Renderer(canvas,
          Vex.Flow.Renderer.Backends.CANVAS);

          var ctx = renderer.getContext();
          var stave = new Vex.Flow.Stave(10, 0, 500);

          // Add a treble clef
          stave.addClef("treble");
          stave.setContext(ctx).draw();
          //readMidi(buf);
          // Create a quarter E, a half D, and a quarter C-Major chord.
          var notes = [
            new Vex.Flow.StaveNote({ keys: ["e/5"], duration: "q" }),
            new Vex.Flow.StaveNote({ keys: ["d/5"], duration: "h" }),
            new Vex.Flow.StaveNote({ keys: ["c/5", "e/5", "g/5"], duration: "q" })
          ];

          // Create a second voice, with just one whole note
          var notes2 = [
            new Vex.Flow.StaveNote({ keys: ["c/4"], duration: "w" })
          ];

          // Create a voice in 4/4
          function create_4_4_voice() {
            return new Vex.Flow.Voice({
              num_beats: 4,
              beat_value: 4,
              resolution: Vex.Flow.RESOLUTION
            });
          }

          // Create voices and add notes to each of them.
          var voice = create_4_4_voice().addTickables(notes);
          var voice2 = create_4_4_voice().addTickables(notes2);

          // Format and justify the notes to 500 pixels
          var formatter = new Vex.Flow.Formatter().
            joinVoices([voice, voice2]).format([voice, voice2], 500);

          // Render voice
          voice.draw(ctx, stave);
          voice2.draw(ctx, stave);
                //readMidi();
        }

        function stringToUint(string) {
          var string = btoa(unescape(encodeURIComponent(string))),
              charList = string.split(''),
              uintArray = [];
          for (var i = 0; i < charList.length; i++) {
              uintArray.push(charList[i].charCodeAt(0));
          }
          return new Uint8Array(uintArray);
        }


        function readMidi(anyBuffer){
                    // Your variable with a ArrayBuffer instance containing your MIDI file 
          //var anyBuffer = "/Metallica-FadeToBlack.mid";
           
          // Creating the MIDIFile instance 
          var midiFile = new MIDIFile(anyBuffer);
          console.log(midiFile);
          // Reading headers 
          midiFile.header.getFormat(); // 0, 1 or 2 
          midiFile.header.getTracksCount(); // n 
          // Time division 
          if(midiFile.header.getTimeDivision() === midiFile.header.getTicksPerBit) {
            midiFile.header.getTicksPerBit();
          } else {
            midiFile.header.getTimeDivision();
          }
           
          // MIDI events retriever 
          var events = midiFile.getMidiEvents();
          console.log(midiFile.getMidiEvents());  
          events[0].subtype; // type of [MIDI event](https://github.com/nfroidure/MIDIFile/blob/master/src/MIDIFile.js#L34) 
          events[0].playTime; // time in ms at wich the event must be played 
          events[0].param1; // first parameter 
          events[0].param2; // second one 
           
          // Lyrics retriever 
          var lyrics = midiFile.getLyrics();
          lyrics[0].playTime; // Time at wich the text must be displayed 
          lyrics[0].text; // The text content to be displayed 
           
          // Reading whole track events and filtering them yourself 
          var trackEventsChunk = midiFile.getTrackEvents(0);
          var events = new MIDIFile.createParser(trackEventsChunk);
          var event;
           
          while(event=events.next()) {
            // Printing meta events containing text only 
            if(event.type === MIDIFile.EVENT_META && event.text) {
              console.log('Text meta: '+event.text);
            }
          }
        }

    }
})();
