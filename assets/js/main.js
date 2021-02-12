/**
* Template Name: Bethany - v2.2.0
* Template URL: https://bootstrapmade.com/bethany-free-onepage-bootstrap-theme/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
!(function($) {
  "use strict";

  // Smooth scroll for the navigation menu and links with .scrollto classes
  var scrolltoOffset = $('#header').outerHeight() - 1;
  $(document).on('click', '.nav-menu a, .mobile-nav a, .scrollto', function(e) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      if (target.length) {
        e.preventDefault();

        var scrollto = target.offset().top - scrolltoOffset;

        if ($(this).attr("href") == '#header') {
          scrollto = 0;
        }

        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.nav-menu, .mobile-nav').length) {
          $('.nav-menu .active, .mobile-nav .active').removeClass('active');
          $(this).closest('li').addClass('active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
        return false;
      }
    }
  });

  // Activate smooth scroll on page load with hash links in the url
  $(document).ready(function() {
    if (window.location.hash) {
      var initial_nav = window.location.hash;
      if ($(initial_nav).length) {
        var scrollto = $(initial_nav).offset().top - scrolltoOffset;
        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');
      }
    }
  });

  // Mobile Navigation
  if ($('.nav-menu').length) {
    var $mobile_nav = $('.nav-menu').clone().prop({
      class: 'mobile-nav d-lg-none'
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>');
    $('body').append('<div class="mobile-nav-overly"></div>');

    $(document).on('click', '.mobile-nav-toggle', function(e) {
      $('body').toggleClass('mobile-nav-active');
      $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
      $('.mobile-nav-overly').toggle();
    });

    $(document).on('click', '.mobile-nav .drop-down > a', function(e) {
      e.preventDefault();
      $(this).next().slideToggle(300);
      $(this).parent().toggleClass('active');
    });

    $(document).click(function(e) {
      var container = $(".mobile-nav, .mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
      }
    });
  } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
    $(".mobile-nav, .mobile-nav-toggle").hide();
  }

  // Navigation active state on scroll
  var nav_sections = $('section');
  var main_nav = $('.nav-menu, .mobile-nav');

  $(window).on('scroll', function() {
    var cur_pos = $(this).scrollTop() + 200;

    nav_sections.each(function() {
      var top = $(this).offset().top,
        bottom = top + $(this).outerHeight();

      if (cur_pos >= top && cur_pos <= bottom) {
        if (cur_pos <= bottom) {
          main_nav.find('li').removeClass('active');
        }
        main_nav.find('a[href="#' + $(this).attr('id') + '"]').parent('li').addClass('active');
      }
      if (cur_pos < 300) {
        $(".nav-menu ul:first li:first, .mobile-menu ul:first li:first").addClass('active');
      }
    });
  });

  // Toggle .header-scrolled class to #header when page is scrolled
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('#header').addClass('header-scrolled');
    } else {
      $('#header').removeClass('header-scrolled');
    }
  });

  if ($(window).scrollTop() > 100) {
    $('#header').addClass('header-scrolled');
  }

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });

  $('.back-to-top').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

  // jQuery counterUp
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000
  });

  // Porfolio isotope and filter
  $(window).on('load', function() {
    var portfolioIsotope = $('.portfolio-container').isotope({
      itemSelector: '.portfolio-item',
      layoutMode: 'fitRows'
    });

    $('#portfolio-flters li').on('click', function() {
      $("#portfolio-flters li").removeClass('filter-active');
      $(this).addClass('filter-active');

      portfolioIsotope.isotope({
        filter: $(this).data('filter')
      });
      aos_init();
    });
  });

  // Initiate venobox (lightbox feature used in portofilo)
  $(document).ready(function() {
    $('.venobox').venobox();
  });

  // Testimonials carousel (uses the Owl Carousel library)
  $(".testimonials-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 1
      },
      900: {
        items: 2
      }
    }
  });

  // Portfolio details carousel
  $(".portfolio-details-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1
  });

  // Init AOS
  function aos_init() {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  }
  $(window).on('load', function() {
    aos_init();
  });
  
  //BİO POP-OVER function
  $('.speaker').hover(function() {

   $(this).popover({
      trigger: 'hover',
      content: function() {

               // $(this) is set to the element with the popover
               // get your_data, 
			   var index = parseInt($(this).attr("id"));
      if($.i18n().locale == 'en'){
        return biolist[index];
      }else if($.i18n().locale == 'tr'){
        return biolisttr[index];
      }

            },
      placement: 'bottom'
    })
    .popover('show');

 });  
 
 	 var update_texts = function(){
		 $('body').i18n();
	 };
 
 $(document).ready(function() {
	 
	    $.i18n().load( 
		{

		"en": {
			"home": "Home",
			"about": "About",
			"speakers": "Speakers",
			"ambass": "Ambassadors",
			"volunteers": "Volunteers",
			"supporters": "Supporters",
			"register" : "Register",
			"abo" : "<br /> <br />  <br /> <br /> <br /> <br /> <br /> WiDS Istanbul is an independent event organized by WiDS ambassadors, Aslıhan Demirkaya, Öznur Taştan and Özge Özmen. WiDS Istanbul will take place on March 7, 2021 and coincides with the annual Women in Data Science (WiDS) Worldwide conference hosted by Stanford University and an estimated 150+ locations worldwide. All genders are invited to attend WiDS events, which feature outstanding women doing outstanding work.",
			"amb": "Ambassadors",
		},
		"tr": {
			"home": "Anasayfa",
			"about": "Hakkında",
			"speakers": "Konuşmacılar",
			"ambass": "Temsilciler",
			"volunteers": "Gönüllüler",
			"supporters": "Destekçiler",
			"register" : "Kayıt",
			"abo":"<br /> <br />  <br /> <br /> <br /> <br /> <br /> Veri Biliminde Kadınlar  İstanbul, WiDS elçileri Aslıhan Demirkaya, Öznur Taştan ve Özge Özmen tarafından düzenlenen bağımsız bir etkinliktir. WiDS  İstanbul, 7 Mart 2021'de Stanford Üniversitesi ve dünya çapında 150'den fazla lokasyonun ev sahipliğinde aynı anda gerçekleşecektir. Tüm cinsiyetler, harika işler yapan harika kadınların yer aldığı WiDS etkinliklerine davetlidir.",
			"amb": "Temsilciler",
			
		}

		} );
		update_texts();
 });

 $('#langlink').click(function(e) {
  e.preventDefault();
    $('#langlink').text(function(_,txt) {
        var ret='';

        if ( txt == 'TR' ) {
           ret = 'EN';
       $.i18n().locale = 'tr';

        }else{
           ret = 'TR';
       $.i18n().locale = 'en';
        }
    update_texts();
        return ret;
    });
    return false;
});
 



})(jQuery);