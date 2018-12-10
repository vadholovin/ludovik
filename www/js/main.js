/*----------------------------------------------------*/
/*	Animated Scroll To Anchor
/*----------------------------------------------------*/
jQuery(document).ready(function($){

  "use strict";
  $.fn.scrollTo = function( options ) {

    var settings = {
      offset : -60,       //an integer allowing you to offset the position by a certain number of pixels. Can be negative or positive
      speed : 'slow',   //speed at which the scroll animates
      override : null,  //if you want to override the default way this plugin works, pass in the ID of the element you want to scroll through here
      easing : null //easing equation for the animation. Supports easing plugin as well (http://gsgd.co.uk/sandbox/jquery/easing/)
    };

    if (options) {
      if(options.override){
        //if they choose to override, make sure the hash is there
        options.override = (override('#') != -1)? options.override:'#' + options.override;
      }
      $.extend( settings, options );
    }

    return this.each(function(i, el){
      $(el).click(function(e){
        var idToLookAt;
        if ($(el).attr('href').match(/#/) !== null) {
          e.preventDefault();
          idToLookAt = (settings.override)? settings.override:$(el).attr('href');//see if the user is forcing an ID they want to use
          //if the browser supports it, we push the hash into the pushState for better linking later
          if(history.pushState){
            history.pushState(null, null, idToLookAt);
            $('html,body').stop().animate({scrollTop: $(idToLookAt).offset().top + settings.offset}, settings.speed, settings.easing);
          }else{
            //if the browser doesn't support pushState, we set the hash after the animation, which may cause issues if you use offset
            $('html,body').stop().animate({scrollTop: $(idToLookAt).offset().top + settings.offset}, settings.speed, settings.easing,function(e){
              //set the hash of the window for better linking
              window.location.hash = idToLookAt;
            });
          }
        }
      });
    });
  };

  $('#toAbout, #toAbout2, #toServices, #toServices2, #toContacts, #toContacts2, #toTeam, #toTeam2, #toSerts, #toSerts2, #toSale, #toSale2' ).scrollTo({ speed: 1400 });

});


/*----------------------------------------------------*/
/*  MENU
/*----------------------------------------------------*/
$(document).ready(function () {

  function openMenu() {
    $('.menu-mobile').addClass('open');
  }

  function hideMenu() {
    $('.menu-mobile').removeClass('open');
  }

  // Open menu
  $('.menu-hamburger').click(function() {
    openMenu();
  });

  $('.menu-hamburger').on('keydown', function(e){
    if (e.keyCode == 13) {
      openMenu();
    }
  });

  // Hide menu
  $('.main-menu__list--mobile a').click(function() {
    hideMenu();
  });

  $('.menu-close').click(function() {
    hideMenu();
  });

  $(document).on('keydown', function(e) {
    if ($('.menu-mobile').hasClass('open') && e.keyCode == 27) {
      hideMenu();
    }
  });

});


/*----------------------------------------------------*/
/*	SCROLL NAVBAR
/*----------------------------------------------------*/
(function($) {

  $(window).scroll(function(){

    "use strict";

    var b = $(window).scrollTop();

    if ( b > 300) {
      $(".page-header").addClass("header--scroll-fixed");
    } else if ( b < 300) {
      $(".page-header").removeClass("header--scroll-fixed");
    }

  });

})( jQuery );


/*----------------------------------------------------*/
/*	ONSCROLL ANIMATION
/*----------------------------------------------------*/

jQuery(document).ready(function ($) {

  "use strict";

  $('.animated').appear(function () {

    var elem = $(this);
    var animation = elem.data('animation');

    if (!elem.hasClass('visible')) {
      var animationDelay = elem.data('animation-delay');
      if (animationDelay) {
        setTimeout(function () {
          elem.addClass(animation + " visible");
        }, animationDelay);

      } else {
        elem.addClass(animation + " visible");
      }
    }
  });
});


/*----------------------------------------------------*/
/*	#CAROUSEL
/*----------------------------------------------------*/

// #About Slider
jQuery(document).ready(function($){

  "use strict";

  var owl  = $("#aboutSlider");

  owl.owlCarousel({
    slideSpeed: 600,
    items: 1,
    navigation: true,
    pagination: false,
    navigationText: false
  });

  // Carousel Navigation
  $("#aboutNav .next").click(function(){
    owl.trigger('next.owl.carousel');
  })

  $("#aboutNav .prev").click(function(){
    owl.trigger('prev.owl.carousel');
  })
});

// #Services Slider
jQuery(document).ready(function($){

  "use strict";

  var owl  = $("#servicesSlider");

  owl.owlCarousel({
    slideSpeed: 600,
    items: 1,
    autoHeight:true,
    navigation: true,
    pagination: false,
    navigationText: false
  });

  // Carousel Navigation
  $("#servicesNav .next").click(function(){
    owl.trigger('next.owl.carousel');
  })

  $("#servicesNav .prev").click(function(){
    owl.trigger('prev.owl.carousel');
  })
});

// #Team Slider
jQuery(document).ready(function($){

  "use strict";

  var owl  = $("#teamSlider");

  owl.owlCarousel({
    slideSpeed: 600,
    items: 3,
    responsive: {
      0: {
        items: 1
      },
      576: {
        items: 2
      },
      768: {
        items: 3
      }
    },
    navigation: true,
    pagination: false,
    navigationText: false
  });

  // Carousel Navigation
  $("#teamNav .next").click(function(){
    owl.trigger('next.owl.carousel');
  })

  $("#teamNav .prev").click(function(){
    owl.trigger('prev.owl.carousel');
  })
});

// #Serts Slider
jQuery(document).ready(function($){

  "use strict";

  var owl  = $("#sertsSlider");

  owl.owlCarousel({
    slideSpeed: 600,
    items: 1,
    navigation: true,
    pagination: false,
    navigationText: false
  });

  // Carousel Navigation
  $("#sertsNav .next-text").click(function(){
    owl.trigger('next.owl.carousel');
  })

  $("#sertsNav .prev-text").click(function(){
    owl.trigger('prev.owl.carousel');
  })
});


/*----------------------------------------------------*/
/*  #FORM & ANSWERS
/*----------------------------------------------------*/

(function() {
  // var wpcf7Elms = document.querySelectorAll('.wpcf7');
  var answers = document.querySelectorAll('.js-modal-answer');
  var answerYep = document.getElementById('answerPositive');
  var answerNope = document.getElementById('answerNegative');
  var forms = document.querySelectorAll('.js-modal-form');
  var formRequest = document.getElementById('modalRequestForm');

  function hideForm() {
    forms.forEach(function(form) {
      if (form.classList.contains('appear')) {
        form.classList.remove('appear');
      }
    });
  }

  function hideAnswer() {
    answers.forEach(function(answer) {
      if (answer.classList.contains('appear')) {
        setTimeout(function() {
          answer.classList.remove('appear');
        }, 3000);
      }
    });
  }

  document.addEventListener('click', function(event) {

    if (event.target.classList.contains('js-form-trigger')) {
      formRequest.classList.add('appear');
    }

    if (event.target.classList.contains('js-call-trigger')) {
      formCall.classList.add('appear');
    }

  });

  document.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal-scrollable')) {
      event.target.parentElement.classList.remove('appear');
    }
  });

  document.addEventListener('click', function(event) {
    if (event.target.classList.contains('js-modal-close')) {
      event.target.parentElement.parentElement.parentElement.classList.remove('appear');
    }
  });

  window.addEventListener('keydown', function(event) {
    if (event.keyCode == 27) {
      hideForm();
    }
  });
  /*
  wpcf7Elms.forEach(function(item) {

    item.addEventListener('wpcf7mailsent', function() {
      hideForm();
      answerYep.classList.add('appear');
      hideAnswer();
    });

    item.addEventListener( 'wpcf7mailfailed', function() {
      hideForm();
      answerNope.classList.add('appear');
      hideAnswer();
    });

  });
  */
})();
