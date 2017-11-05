'use strict';
$(document).ready(function(){

	if (!Modernizr.flexbox || !Modernizr.svg) {
		$('.browser-warning').show();
		$('.btn--js-close-alert').click(function() {
			$('.browser-warning').hide();
		});
	}

	$(document).on('keydown', checkKey);

	function checkKey(e) {

	    e = e || window.event;
	    if (e.keyCode == '27') {
			// escape key
			// Close project details ===================== //
			$('#project-content').removeClass('fade-in');

			$('#project-content').one('msTransitionEnd transitionend', function() {
				$('body').removeClass('js-no-scroll').removeClass('project-loaded');
				$('.projects').removeClass('projects--loading-project');
				$('.slick-slider').slick('unslick');
				$('#project-content').empty();
			});
	    }

	}

	// Open project details ===================== //
	$('.project-card').on('click', function() {
		// Prevent body from scrolling behind the modal
		$('body').addClass('js-no-scroll project-loaded');
		$('.projects').addClass('projects--loading-project');
		var dataUrl = $(this).data('url');
		$('#project-loader').addClass('hide-overflow');
		$('#project-loader').one('msTransitionEnd transitionend', function() {
			
			$(this).append('<div class="spinner"></div>').removeClass('hide-overflow');
			$('#project-content').load(dataUrl, function(response, status, xhr) {
				$('.spinner').remove();
				$(this).addClass('fade-in');
			});
		});
	});

	// Close project details =================== //
	$('.btn--js-close-project').on('click', function() {
		$('#project-content').removeClass('fade-in');
		$('#project-content').one('msTransitionEnd transitionend', function() {
			$('body').removeClass('js-no-scroll').removeClass('project-loaded');
			$('.projects').removeClass('projects--loading-project');
			$('.slick-slider').slick('unslick');
			$('#project-content').empty();
		});
		
	});


});