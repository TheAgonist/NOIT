(function () {
    'use strict';
    angular
        .module('app')
        .controller('Generator.IndexController', Controller);
    function Controller(generatorService, songs) {
        initController();
        function initController(){
          var Buffer = generatorService.generate();
         /* console.log(songs[0]);
          //console.log(sheetMusicService.resolve(Buffer));
          
      	  var canvas = $("canvas")[0];
          var renderer = new Vex.Flow.Renderer(canvas,
          Vex.Flow.Renderer.Backends.CANVAS);

          var ctx = renderer.getContext();
          var stave = new Vex.Flow.Stave(10, 0, 500);

          // Add a treble clef
          stave.addClef("treble");
          stave.setContext(ctx).draw();
          readMidi(Buffer);
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
          }*/
        }

    }
})();
