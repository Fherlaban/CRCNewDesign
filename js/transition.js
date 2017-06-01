jQuery(document).ready(function(event){
  var isAnimating = false,
    newLocation = '';
    firstLoad = false;


  $('main').on('click', '[data-type="page-transition"]', function(event){
    event.preventDefault();
    //yung dedetect page selected
    var newPage = $(this).attr('href');
    //trigger na yung animation agad pag hindi supported
    if( !isAnimating ) changePage(newPage, true);
    firstLoad = true;
  });

  //click yung back button
  $(window).on('popstate', function() {
  	if( firstLoad ) {
      var newPageArray = location.pathname.split('/'),
        //page na to be loaded
        newPage = newPageArray[newPageArray.length - 1];

      if( !isAnimating  &&  newLocation != newPage ) changePage(newPage, false);
    }
    firstLoad = true;
	});

	function changePage(url, bool) {
    isAnimating = true;
    // trigger page animation
    $('body').addClass('page-is-changing');
    $('.gal-loading-bar').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
    	loadNewContent(url, bool);
      newLocation = url;
      $('.gal-loading-bar').off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
    });
    //kung yung browser hindi supported ang CSS transitions
    if( !transitionsSupported() ) {
      loadNewContent(url, bool);
      newLocation = url;
    }
	}

	function loadNewContent(url, bool) {
		url = ('' == url) ? 'index.html' : url;
  	var newSection = 'gal-'+url.replace('gallery.html', '');
  	var section = $('<div class="gal-main-content '+newSection+'"></div>');

  	section.load(url+' .gal-main-content > *', function(event){
      // load new content and replace <main> content with the new one
      $('main').html(section);
      //if browser doesn't support CSS transitions - dont wait for the end of transitions
      var delay = ( transitionsSupported() ) ? 1500 : 0;
      setTimeout(function(){
        //wait for the end of the transition on the loading bar before revealing the new content
        ( section.hasClass('gal-about') ) ? $('body').addClass('gal-about') : $('body').removeClass('gal-about');
        $('body').removeClass('page-is-changing');
        $('.gal-loading-bar').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
          isAnimating = false;
          $('.gal-loading-bar').off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
        });

        if( !transitionsSupported() ) isAnimating = false;
      }, delay);

      if(url!=window.location && bool){
        //add the new page to the window.history
        //if the new page was triggered by a 'popstate' event, don't add it
        //window.history.pushState({path: url},'',url);
        setTimeout(function(){
          //wait for the end of the transition on the loading bar before revealing the new content
        window.location.replace('gallery.html');
      }, 1500);
      }
		});
  }

  function transitionsSupported() {
    return $('html').hasClass('csstransitions');
  }
});
