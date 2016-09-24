'use strict';
$(document).ready(function(){
	function debounce(func, wait, immediate) {
		var timeout;
		return function() {
			var context = this, args = arguments;
			var later = function() {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	};	
	
	function isElementInViewport(el) {

	    //special bonus for those using jQuery
	    if (typeof jQuery === "function" && el instanceof jQuery) {
	        el = el[0];
	    }

	    var rect = el.getBoundingClientRect();
	    return (
	        // rect.top >= 0 &&
	        rect.top < el.clientHeight / 2 &&
	        rect.left >= 0 &&
	        // rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
	        rect.bottom > el.clientHeight / 2 &&
	        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
	    );
	}
	

	var myEfficientFn = debounce(function() {
		var aboutSectionNavIndicator_1 = $('#nav-about-1');
		var aboutSectionNavIndicator_2 = $('#nav-about-2');
		// var aboutSectionNavIndicator_3 = $('#nav-about-3');

		if (isElementInViewport($('#about-1'))) {
		    aboutSectionNavIndicator_1.addClass('active');
		} else {
			aboutSectionNavIndicator_1.removeClass('active');
		}
		if (isElementInViewport($('#about-2'))) {
		    aboutSectionNavIndicator_2.addClass('active');
		} else {
			aboutSectionNavIndicator_2.removeClass('active');
		}
		// if (isElementInViewport($('#about-3'))) {
		//     console.log('3 in view');
		//     aboutSectionNavIndicator_3.addClass('active');
		// } else {
		// 	aboutSectionNavIndicator_3.removeClass('active');
		// }

	}, 250, false);
	
	window.addEventListener('scroll', myEfficientFn);
	
});