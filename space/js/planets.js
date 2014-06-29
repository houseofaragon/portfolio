      var paused = true;
      $(".span3").on('click',function(){
        var planet = $(this).attr('id');
        $("<audio id='audio-"+ planet+"'></audio>").attr({ 
          'src':'audio/'+ planet  +'.mp3', 
          'src':'audio/'+ planet  +'.ogg', 
          'volume':0.4
        }).appendTo("body");
        $("<source></source>").attr({
           'src':'audio/'+ planet  +'.mp3', 
        }).appendTo("#audio"+planet);
        $("<source></source>").attr({
           'src':'audio/'+ planet  +'.ogg', 
        }).appendTo("#audio"+planet);

        var sound = $("#audio-"+planet)[0];
        if (this.paused === false) {
            console.log(sound); 
             $(this).css('-webkit-transform',' rotate(0deg)');
             $(this).css('-moz-transform',' rotate(0deg)');
             $(this).css('-o-transform-origin',' rotate(0deg)');
             $(this).css('transform-origin',' rotate(0deg)');            this.paused = true;
            sound.pause();
        } else {
            sound.play();
            console.log('added' + planet);
             $(this).css('-webkit-transform',' rotate(30deg)');
             $(this).css('-moz-transform',' rotate(30deg)');
             $(this).css('-o-transform-origin',' rotate(30deg)');
             $(this).css('transform-origin',' rotate(30deg)');
             this.paused = false;
        }
      });
