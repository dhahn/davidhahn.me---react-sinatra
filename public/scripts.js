$(document).ready(function(){ 

	var makerCount = -1,
	    makerWordArray = JSON.parse(window.config.maker_words),
      makerTimeout = setTimeout(makerTimeoutFunction, 1000);
  function makerTimeoutFunction() {
		var new_word = makerWordArray[++makerCount % makerWordArray.length];
		$("#maker-of-things .keyword").html(new_word);
    makerTimeout = setTimeout(makerTimeoutFunction, 1000);
  }

  var toolsCount = -1,
	    toolsWordArray = JSON.parse(window.config.tools_words),
	    toolsTimeout = setTimeout(toolsTimeoutFunction, 1000);
  function toolsTimeoutFunction() {
		var new_word = toolsWordArray[++toolsCount % toolsWordArray.length];
		$("#make-things-with .keyword").html(new_word);
    toolsTimeout = setTimeout(toolsTimeoutFunction, 250);
  }

	$('a[href^="#"]').on('click',function (e) {
	    e.preventDefault();

	    var target = this.hash;
	    var $target = $(target);

	    $('html, body').stop().animate({
	        'scrollTop': $target.offset().top
	    }, 800, 'swing', function () {
	        window.location.hash = target;
	    });
	});
});