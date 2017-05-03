'use strict';
$(document).ready(function(){

	if (!Modernizr.flexbox || !Modernizr.svg) {
		$('.browser-warning').show();
		$('.btn--js-close-alert').click(function() {
			$('.browser-warning').hide();
		});
	}

	// $(function() {
	    // FastClick.attach(document.body);
	// });

	// Helper functions ==================== //
	// Smooth scroll to section
	$.fn.goTo = function(offset) {
		$('html, body').animate({
            scrollTop: ($(this).offset().top - offset) + 'px'
        }, 500);
        return this; // for chaining...
    }
	

	$('.content-link').on('click', function() {
		$('#about-2').goTo(44);
	});

	$(document).on('keydown', checkKey);

	function checkKey(e) {

	    e = e || window.event;

	    if (e.keyCode == '38') {
	        // up arrow
	        $('#about-1').goTo(75);
	    }
	    else if (e.keyCode == '40') {
	        // down arrow
	        $('#about-2').goTo(0);
	    }
	    else if (e.keyCode == '27') {
			// escape key
			// Close project details ===================== //
			$('#project-content').removeClass('fade-in');

			$('#project-content').one('msTransitionEnd transitionend', function() {
				$('body').removeClass('js-no-scroll').removeClass('project-loaded');
				$('.projects').removeClass('projects--loading-project');
				$('#project-content').empty();
			});
	    }

	}

	// Open project details ===================== //
	$('.project-card').on('click', function() {
		$('body').addClass('js-no-scroll project-loaded');
		$('.projects').addClass('projects--loading-project');
		var dataUrl = $(this).data('url');
		$('#project-loader').addClass('hide-overflow');
		$('#project-loader').one('msTransitionEnd transitionend', function() {
			// $('body').addClass('js-no-scroll project-loaded');
			// Prevent body from scrolling behind the modal
			// $('body').addClass('js-no-scroll');
			$(this).removeClass('hide-overflow');
			$('#project-content').load(dataUrl, function(response, status, xhr) {
				$(this).addClass('fade-in');
			});
		});
	});

	$('.btn--js-close-project').on('click', function() {
		$('#project-content').removeClass('fade-in');
		$('#project-content').one('msTransitionEnd transitionend', function() {
			$('body').removeClass('js-no-scroll').removeClass('project-loaded');
			$('.projects').removeClass('projects--loading-project');
			$('#project-content').empty();
		});
		
	});


});