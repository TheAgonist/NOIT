(function () {
    'use strict';
    angular
        .module('app')
        .controller('sheetMusic.IndexController', Controller);
    



    function Controller(sheetMusicService, songs) {
        initController();
        function toArrayBuffer(buffer) {
          //console.log(buffer);
          var ab = new ArrayBuffer(buffer.length);
          var view = new Uint8Array(ab);
          var i;

          for (i = 0; i < buffer.length; ++i) {
            view[i] = buffer[i];
          }
          console.log(ab);
          return ab;
        }

        function ab2str(buf) {
          return String.fromCharCode.apply(null, new Uint16Array(buf));
        }
        function str2ab(str) {
          var buf = new ArrayBuffer(str.length * 3); // 2 bytes for each char
          var bufView = new Uint8Array(buf);
          for (var i = 0, strLen = str.length; i < strLen; i++) {
              bufView[i] = str.charCodeAt(i);
          }
          return bufView.buffer;
        }

        function _base64ToArrayBuffer(base64) {
            var binary_string =  window.atob(base64);
            var len = binary_string.length;
            var bytes = new Uint8Array( len );
            for (var i = 0; i < len; i++)        {
                bytes[i] = binary_string.charCodeAt(i);
            }
            return bytes.buffer;
        }

        function base64ToArrayBuffer(base64) {
            var binary_string =  window.atob(base64);
            var len = binary_string.length;
            var bytes = new Uint8Array( len );
            for (var i = 0; i < len; i++)        {
                bytes[i] = binary_string.charCodeAt(i);
            }
            return bytes.buffer;
        }

        function initController(){
          //console.log(typeof(songs));

          //var bufView = new Uint16Array(buf)
          //console.log(function($scope, category) { return category; });
          
          //console.log(songs);
          //var buffer = str2ab(songs);
          var buff = toArrayBuffer(songs);
          //console.log(buff);
          //MIDI.Player.resume(); // resume the MIDI track from pause.
          //MIDI.Player.pause(); // pause the MIDI track.
          //MIDI.Player.stop(); // stops all audio being played, and resets currentTime to 0.


          //console.log(buffer);
      	  var canvas = $("canvas")[0];
          var renderer = new Vex.Flow.Renderer(canvas,
    Vex.Flow.Renderer.Backends.CANVAS);

  var ctx = renderer.getContext();
  var stave = new Vex.Flow.Stave(10, 0, 500);

  // Add a treble clef
  stave.addClef("treble");
  stave.setContext(ctx).draw();

  var notes = [
    new Vex.Flow.StaveNote({ keys: ["e##/5"], duration: "8d" }).
      addAccidental(0, new Vex.Flow.Accidental("##")).addDotToAll(),
    new Vex.Flow.StaveNote({ keys: ["b/4"], duration: "16" }).
      addAccidental(0, new Vex.Flow.Accidental("b"))
  ];

  var notes2 = [
    new Vex.Flow.StaveNote({ keys: ["b/4"], duration: "8" }),
    new Vex.Flow.StaveNote({ keys: ["d/4"], duration: "16" }),
    new Vex.Flow.StaveNote({ keys: ["c/4", "e/4"], duration: "16" }).
      addAccidental(0, new Vex.Flow.Accidental("b"))
  ];

  var notes3 = [
    new Vex.Flow.StaveNote({ keys: ["c/4", "e/4"], duration: "8" }),
    new Vex.Flow.StaveNote({ keys: ["e/4"], duration: "8" }).
      addAccidental(0, new Vex.Flow.Accidental("#"))
  ];

  var notes4 = [ 
    new Vex.Flow.StaveNote({ keys: ["d/4"], duration: "8" }),
    new Vex.Flow.StaveNote({ keys: ["e/4"], duration: "8" }),
  ];

  // Create the beams
  var beam = new Vex.Flow.Beam(notes);
  var beam2 = new Vex.Flow.Beam(notes2);
  var beam3 = new Vex.Flow.Beam(notes3);
  var beam4 = new Vex.Flow.Beam(notes4);

  // Create a tie between the last note of the first group and the
  // first note of the last group.
  var tie = new Vex.Flow.StaveTie({
    first_note: notes[1],
    last_note: notes2[0],
    first_indices: [0],
    last_indices: [0]
  });

  // Create another tie between the two chords in the tune
  var tie2 = new Vex.Flow.StaveTie({
    first_note: notes2[2],
    last_note: notes3[0],
    first_indices: [0, 1],
    last_indices: [0, 1]
  });

  var all_notes = notes.concat(notes2).concat(notes3).concat(notes4);

  // Helper function to justify and draw a 4/4 voice
  Vex.Flow.Formatter.FormatAndDraw(ctx, stave, all_notes);

  // Render beams
  beam.setContext(ctx).draw();
  beam2.setContext(ctx).draw();
  beam3.setContext(ctx).draw();
  beam4.setContext(ctx).draw();

  // Render ties
  tie.setContext(ctx).draw();
  tie2.setContext(ctx).draw();          //voice2.draw(ctx, stave);
                //readMidi();
          console.log(songs.data);
          readMidi(buff);
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
