/* globals $: false */
;(function( $, window, document, undefined )
{
  $.fn.doubleTapToGo = function( params )
  {
    if( !( 'ontouchstart' in window ) &&
      !navigator.msMaxTouchPoints &&
      !navigator.userAgent.toLowerCase().match( /windows phone os 7/i ) ) return false;

    this.each( function()
    {
      var curItem = false;

      $( this ).on( 'click', function( e )
      {
        var item = $( this );
        if( item[ 0 ] != curItem[ 0 ] )
        {
          e.preventDefault();
          curItem = item;
        }
      });

      $( document ).on( 'click touchstart MSPointerDown', function( e )
      {
        var resetItem = true,
          parents   = $( e.target ).parents();

        for( var i = 0; i < parents.length; i++ )
          if( parents[ i ] == curItem[ 0 ] )
            resetItem = false;

        if( resetItem )
          curItem = false;
      });
    });
    return this;
  };
})( jQuery, window, document );

(function(){
  'use strict';

  var setContainerWidth = function(){
    $('.nav-container').css('width', $(window).width() + 'px');
  };
  $(window).resize(function(){
    setContainerWidth();
  });
  setContainerWidth();

  $('.nav-container').affix({
    offset: {
      top: $('.header').height() || 0,
      bottom: $('.footer').height()
    }
  });
  $('.nav-sub-container').affix({
    offset: {
      top: -10,
      bottom: $('.footer').height()
    }
  });

  $(document).on('touchstart', '.header-tile', function(event){
    $(this).addClass('hover');
  });
  $(document).on('touchend', '.header-tile', function(){
    $(this).removeClass('hover');
  });

  //Show and hide submenu
  $(document).on('touchstart, click', '.nav li.touchable', function(event) {
    //event.preventDefault();
    if ($(event.target).closest('.touchable').hasClass('submenuShown')) {
      $(event.target).closest('.touchable').removeClass('submenuShown');
    }
    else {
      $(event.target).closest('.touchable').addClass('submenuShown');
      event.preventDefault();
     }
  });

  //TODO: proper implementation with loose focus
  $('.container').click(function(event) {
    $('.touchable').removeClass('submenuShown');
  });

  $('.main-signup').on('touchstart mouseover', function(){
    $('.header-tile').addClass('hover');
  }).on('touchend mouseout', function(){
    $('.header-tile').removeClass('hover');
  });
  $('.map').on('mouseover touchstart', function(){
    $(this).replaceWith(
      '<iframe src="' + $(this).data('url') + '" width="100%"" height="500px" frameBorder="0"></iframe>'
      );
  });

  $('.smooth-scroll').click(function(e) {
    e.preventDefault();
    //calculate destination place
    var dest = 0;
    if ($(this.hash).offset().top > $(document).height() - $(window).height()) {
        dest = $(document).height() - $(window).height();
    } else {
        dest = $(this.hash).offset().top;
    }
    //go to destination
    $('html,body').animate({
        scrollTop: dest
    }, 1000, 'swing');
  });
  $('.scroll-offset').click(function(e) {
    e.preventDefault();
    //calculate destination place
    var dest = 0;
    if ($(this.hash).offset().top > $(document).height() - $(window).height()) {
        dest = $(document).height() - $(window).height();
    } else {
        dest = $(this.hash).offset().top;
    }
    //go to destination
    $('html,body').animate({
        scrollTop: dest
    }, 1000, 'swing');
  });

  var html = [], l, t;
  var tileContainer = $('.tiles');
  var containerWidth = tileContainer.width();
  var maxCover = 1200;
  var originalTileSize = 214;
  var tileSize = Math.sqrt(originalTileSize * originalTileSize * 2);
  var offset = 0;
  if (containerWidth > maxCover) {
    offset = Math.floor(((containerWidth - maxCover) / 2) / tileSize);
  }
  var topEven = 39;
  var leftEven = -113 + (offset * tileSize);
  var topOdd = topEven - tileSize / 2;
  var leftOdd = leftEven + (tileSize / 2);
  var n = 0, r;

  for (var i=0; i < 5; i += 1) {
    for (var j=0; j < 6; j += 1) {
      n += 1;
      if (j % 2 === 0) {
        t = topEven + (j / 2) * tileSize;
        l = leftEven + i * tileSize;
      } else {
        t = topOdd + Math.floor(j / 2) * tileSize;
        l = leftOdd + i * tileSize;
      }

      t = Math.round(t * 10) / 10;
      l = Math.round(l * 10) / 10;

      r = Math.floor(Math.random() * 9) + 1;

      html.push('<div class="header-tile" style="left:' + l + 'px;top:' + t + 'px;"><div class="flipper" style="transition-delay:0s;"><div class="front cdv-tiles'+ n + '"></div><div class="back code-tile' + r + '"></div></div></div>');
    }
  }
  tileContainer.html(html.join(''));
}());
