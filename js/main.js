;(function () {

	'use strict';




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

	var toggleBtnColor = function() {


		if ( $('#crc-head').length > 0 ) {
			$('#crc-head').waypoint( function( direction ) {
				if( direction === 'down' ) {
					$('.crc-nav-toggle').addClass('dark');
				}
			} , { offset: - $('#crc-head').height() } );

			$('#crc-head').waypoint( function( direction ) {
				if( direction === 'up' ) {
					$('.crc-nav-toggle').removeClass('dark');
				}
			} , {
				offset:  function() { return -$(this.element).height() + 0; }
			} );
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


	var mobileMenuOutsideClick = function() {

		$(document).click(function (e) {
	    var container = $("#crc-offcanvas, .js-crc-nav-toggle");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {

	    	if ( $('body').hasClass('offcanvas-visible') ) {

    			$('body').removeClass('offcanvas-visible');
    			$('.js-crc-nav-toggle').removeClass('active');

	    	}


	    }
		});

	};



	var offcanvasMenu = function() {
		$('body').prepend('<div id="crc-offcanvas" />');
		$('#crc-offcanvas').prepend('<ul id="crc-side-links">');
		$('body').prepend('<a href="#" #><i></i></a>');

		$('.left-menu li, .right-menu li').each(function(){

			var $this = $(this);

			$('#crc-offcanvas ul').append($this.clone());

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
			}, 500);

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
						},  k * 200, 'easeInOutExpo' );
					});

				}, 100);

			}

		} , { offset: '95%' } );
	};




	$(function(){
		gotToNextSection();
		loaderPage();
		fullHeight();
		toggleBtnColor();
		ScrollNext();
		mobileMenuOutsideClick();
		offcanvasMenu();
		testimonialFlexslider();
		goToTop();


		contentWayPoint();

	});


}());
