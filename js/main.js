(function($) {

	// Variables
	var sectionFrom,
		$slide = $('.slide'),
		$slideActive = $('.slide.active'),
		$navLink = $('.nav a'),
		$navLi = $('.nav li'),
		$nav = $('.nav'),
		$body = $('body');

	// Init function
	function init(){

		// Set active slide visible
		TweenLite.set($slideActive, {x: '0%'});

		// Fade slides in
		TweenLite.set($body, {className: '-=loading'});

	}
	init();

	// Navigation click
	$navLink.on('click', function(e){
		if(e.preventDefault) {
			e.preventDefault();
		} else {
			e.returnValue = false;
		}		

		// prevent animation when animating
		if(!$body.hasClass('is-animating')){

			var sectionFrom = $('.slide.active'),
				sectionToID = $(e.target).attr('href'),
				sectionTo = $('div'+sectionToID);

			if(sectionFrom.attr('id') !== sectionTo.attr('id')){
				
				scrollToSection(sectionFrom, sectionTo);

			}

		}

	});

	function scrollToSection(sectionFrom, sectionTo){

		var heading = sectionTo.find('h1'),
			subheading = sectionTo.find('p'),
			bcg = sectionTo.find('.bcg'),
			bcgFrom = sectionFrom.find('.bcg'),
			tlDown = new TimelineLite({onComplete: setActiveSection(sectionFrom, sectionTo)}),
			tlUp = new TimelineLite();

		if(sectionFrom.index() < sectionTo.index()){

			//console.log('going down');
			tlDown
				.set($body, {className: '+=is-animating'})
				.set(sectionTo, {scale: 0.9})
				.add('out')
				.to($nav, 0.3, {y: '10px', autoAlpha: 0, ease:Power4.easeInOut}, 'out')
				.to(sectionFrom, 0.3, {scale: 0.9, transformOrigin: 'center center', ease:Power4.easeInOut}, 'out')
				.add('across')
				.to(sectionFrom, 1.2, {x: '-=100%', ease:Power4.easeInOut, clearProps: 'all'}, 'out-=0.1')
				.to(sectionTo, 1.2, {x: '0%', ease:Power4.easeInOut}, 'out-=0.1')
				.add('in')
				.to(sectionTo, 0.3, {scale: 1, ease:Power4.easeInOut}, 'in-=0.4')
				.from(heading, 0.3, {autoAlpha: 0, y: '-15px', ease:Power4.easeInOut}, 'in')
				.from(subheading, 0.3, {autoAlpha: 0, y: '-15px', ease:Power4.easeInOut}, 'in+=0.1')
				.to($nav, 0.3, {autoAlpha: 1, y: '0', ease:Power4.easeInOut}, 'in+=0.2')
				.set($body, {className: '-=is-animating'});

		} else {

			//console.log('going up');
			tlUp
				.set($body, {className: '+=is-animating'})
				.set(sectionTo, {x: '-100%', scale: 0.9})
				.add('out')
				.to($nav, 0.3, {y: '10px', autoAlpha: 0, ease:Power4.easeInOut}, 'out')
				.to(sectionFrom, 0.3, {scale: 0.9, transformOrigin: 'center center', ease:Power4.easeInOut}, 'out')
				.add('across')
				.to(sectionFrom, 1.2, {x: '100%', ease:Power4.easeInOut, clearProps: 'all'}, 'out-=0.1')
				.to(sectionTo, 1.2, {x: '0%', ease:Power4.easeInOut}, 'out-=0.1')
				.add('in')
				.to(sectionTo, 0.3, {scale: 1, ease:Power4.easeInOut}, 'in-=0.4')
				.from(heading, 0.3, {autoAlpha: 0, y: '-15px', ease:Power4.easeInOut}, 'in')
				.from(subheading, 0.3, {autoAlpha: 0, y: '-15px', ease:Power4.easeInOut}, 'in+=0.1')
				.to($nav, 0.3, {autoAlpha: 1, y: '0', ease:Power4.easeInOut}, 'in+=0.2')
				.set($body, {className: '-=is-animating'});
		}

	}

	function setActiveSection(sectionFrom, sectionTo){

		// Add active class to the current slide
		sectionFrom.removeClass('active');
		sectionTo.addClass('active');

		// Add a body class highlighting the current slide
		$body.removeAttr('class').addClass($(sectionTo).attr('id')+'-active');

		// Highlight current slide in the navigation
		var currentSlideIndex = parseInt($(sectionTo).attr('id').slice(-2)) -1;
		$navLi.removeAttr('class');
		$navLi.eq(currentSlideIndex).addClass('active');

	}

})(jQuery);










