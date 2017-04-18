$(document).ready(function() {

	window.i = 1;

	window.firstlvl = true;

  $('.play').click(function() {

    $('div').remove();
    
    $('body').prepend('<video width="window.innerWidth" height="window.innerHeight" play> <source src="assets/video/cine.mp4" type="video/mp4"></video>');
    $('video')[0].play();

    $('video').on('ended',function(){
      $('video').remove();
      $.getScript( "js/main.js");

    });

  });// end buton click


});