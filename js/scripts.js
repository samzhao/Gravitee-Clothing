$(function(){
	if($(window).width() <= 720) {
		loadFooter();
	};

	$(window).resize(function(){
		if($(window).width() <= 720) {
			loadFooter();
		};
	});

	$('#container').fadeIn(function(){
		$('#header').animate(
			{top: 0}, {duration: 500, easing: "easeOutCubic", complete: function(){
					loadContents();
				}
		});
		if(navigator.platform == 'iPad' || navigator.platform == 'iPhone' || navigator.platform == 'iPod')
	{
	     $('#footer').css({"position" : "static"});
	} else {
		$('#footer').animate({bottom: -20}, {duration: 500, easing: "easeOutCubic"});
	};
	});

	function loadFooter(){
		$('#contents').ready(function(){
	     	$('#footer').delay(1000).fadeIn();
		});
	};

	$('#searchInput').attr("value", "Search...");

	$('#searchInput').focus(function(){
		if($(this).attr("value") == "Search...") $(this).attr("value", "");
	});

	$('#searchInput').blur(function(){
		if($(this).attr("value") == "") $(this).attr("value", "Search...");
	});

	if(!Modernizr.csstransitions) {
		$('#searchInput').css({"width" : 120});
		$('#searchInput').focus(function(){
			if($(this).css({"width" : 120})) $(this).animate({width: 180});
		});

		$('#searchInput').blur(function(){
			if($(this).css({"width" : 180})) $(this).animate({width: 120});
		});
	};

	if(!($.browser.msie && navigator.userAgent.indexOf('Trident')!==-1) && !($.browser.msie && $.browser.version.substr(0,1) == 6) && !($.browser.msie && $.browser.version.substr(0,1) == 7)){
		$('#logo a').css({"opacity" : 0}).hover(function(){ 
		$(this).stop().animate({"opacity" : 1}, 500);

		}, function(){

		$(this).stop().animate({"opacity" : 0}, 500);
		});
	};

	if(!Modernizr.multiplebgs) {
		$('#footer').removeClass('doubleImage').addClass('singleImage');
	};

	$('#slider').flexslider({
		slideshow: true,
		slideshowSpeed: 3600,
		animationLoop: true,
		pauseOnAction: true,
		resume: 3000,
		controlNav: true,
		directionNav: false,
		controlsContainer: ".flex-container"
	});

	$().UItoTop({ easingType: 'easeOutQuart' });

	var contentCentered = false;

	$(window).bind("resize", centerContent);
	function centerContent() {
		if (contentCentered) { 
			var contentMargin = (($(window).height()-$('#contents').height()+20)/2);
		}
	}
	function loadContents() {
		contentCentered = true;
		centerContent();
		$('#contents').fadeIn();
	}
});