;(function () {

	'use strict';

	$("#Monastic").click(function() {
    $('html, body').animate({
        scrollTop: $("#crc-about").offset().top
    }, 500);
	});

	$("#Initial").click(function() {
		$('html, body').animate({
				scrollTop: $("#crc-features-2").offset().top
		}, 1000);
	});

	$("#Formation").click(function() {
		$('html, body').animate({
				scrollTop: $("#crc-features-3").offset().top
		}, 2000);
	});

	$("#Postulancy").click(function() {
		$('html, body').animate({
				scrollTop: $("#crc-info").offset().top
		}, 3000);
	});

	$("#Process").click(function() {
		$('html, body').animate({
				scrollTop: $("#crc-projects-2").offset().top
		}, 4000);
	});

	$("#Contact").click(function() {
		$('html, body').animate({
				scrollTop: $("#crc-footer").offset().top
		}, 5000);
	});

	var previousScroll = function() {
	  	$(window).scroll(function() {
	    var currentScroll = $(this).scrollTop();
	    if (currentScroll > 0 && currentScroll < $(document).height() - $(window).height()) {
	      if (currentScroll > previousScroll) {
	        window.setTimeout(hideNav, 250);
	      } else {
	        window.setTimeout(showNav, 500);
	      }
	      previousScroll = currentScroll;
	    }
	  });
	  function hideNav() {
	    $("[data-nav-status='toggle']").removeClass("is-visible").addClass("is-hidden");
	  }
	  function showNav() {
	    $("[data-nav-status='toggle']").removeClass("is-hidden").addClass("is-visible");
	  }
	};


	var isiPad = function(){
		return (navigator.platform.indexOf("iPad") != -1);
	};

	var isiPhone = function(){
	    return (
			(navigator.platform.indexOf("iPhone") != -1) ||
			(navigator.platform.indexOf("iPod") != -1)
	    );
	};


	var gotToNextSection = function(){
		var el = $('.crc-learn-more'),
			w = el.width(),
			divide = -w/2;
		el.css('margin-left', divide);
	};


	var loaderPage = function() {
		$(".crc-loader").fadeOut("slow");
	};


	var fullHeight = function() {
		if ( !isiPad() && !isiPhone() ) {
			$('.js-fullheight').css('height', $(window).height() - 49);
			$(window).resize(function(){
				$('.js-fullheight').css('height', $(window).height() - 49);
			})
		}
	};

	var ScrollNext = function() {
		$('body').on('click', '.scroll-btn', function(e){
			e.preventDefault();

			$('html, body').animate({
				scrollTop: $( $(this).closest('[data-next="yes"]').next()).offset().top
			}, 1000, 'easeInOutExpo');
			return false;
		});
	};


	var testimonialFlexslider = function() {
		var $flexslider = $('.flexslider');
		$flexslider.flexslider({
		  animation: "fade",
		  manualControls: ".flex-control-nav li",
		  directionNav: false,
		  smoothHeight: true,
		  useCSS: false
		});
	}


	var goToTop = function() {

		$('.js-gotop').on('click', function(event){

			event.preventDefault();

			$('html, body').animate({
				scrollTop: $('html').offset().top
			}, 50);

			return false;
		});

	};





	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated') ) {

				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							el.addClass('fadeInUp animated');
							el.removeClass('item-animate');
						},  k * 100, 'easeInOutExpo' );
					});

				}, 50);

			}

		} , { offset: '100%' } );
	};




	$(function(){

		previousScroll();
		gotToNextSection();
		loaderPage();
		fullHeight();
		ScrollNext();
		testimonialFlexslider();
		goToTop();


		contentWayPoint();

	});


}());
