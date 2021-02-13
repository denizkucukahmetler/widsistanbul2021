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
      "buket":"Industrial Engineering Student at Sabanci University",
      "duygu": "Senior Software Engineer at Havelsan",
      "deniz":"Computer Science and Engineering Student at Sabanci University",
      "barina": "Statistics Student at Middle East Technical University",	
      "ozlem":"Computer Science and Engineering Student at Erciyes University",
      "busra":"Data Science Master Student at Sabanci University and Data Scientist at Garanti BBVA",
      "busecarik":"Computer Science and Engineering Master Student at Sabanci University",
      "asuman":"Molecular Biology and Genetics Student at Sabanci University",
      "busek":"Data Science Master Student at Sabancı University and Data Analyst at ÇiçekSepeti",
      "elifoz": "Molecular Biology and Genetics Student at Acibadem University",
      "speakers_ab":"WiDS Istanbul will host 14 speakers this year.",
      "ozge_is":"Senior Data Scientist at Instacart",
      "selen":"Research Scientist at Stanford University School of Medicine",
      "burcu":"Senior Machine Learning Engineer, Anti-Abuse AI at LinkedIn",
      "suveyda":"Associate/Specialist at McKinsey & Company",
      "pinar":"Professor and Chair of Computer Engineering at Hacettepe University",
      "gozde":"Professor of AI & Data/ Computer Engineering at Istanbul Technical University; ITU AI Center, Founding Member",
      "sera":"Associate Data Scientist at Philip Morris International",
      "pelin":"Jr Data Analyst at JotForm, MSc Data Science at METU",
      "damla":"CEO at AppNava, Co-founder",
      "mina":"Founder of UP School, ed-tech start-up",
      "seyhan":"Principal Algorithm Research Engineer at SK hynix America Inc.",
      "pinar_er":"Data Scientist at Commencis",
      "fatma":"Assistant Professor at Koç University",
      "wids":"Women in Data Science",
      "conference":"Conference 2021",
      "place":"ISTANBUL, TURKEY",
      "virtual":"VIRTUAL EVENT",
      "register2":"REGISTER",
      "spe": "Speakers",
      "team": "Team Members",
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
			"amb": "Temsilci",
      "buket":"Sabancı Üniversitesi'nde Endüstri Mühendisliği Öğrencisi",
      "duygu": "Havelsan'da Kıdemli Yazılım Mühendisi",
      "deniz":"Sabancı Üniversitesi'nde Bilgisayar Bilimi ve Mühendisliği Öğrencisi",
      "barina": "Orta Doğu Teknik Üniversitesi'nde İstatistik Öğrencisi",	
      "ozlem":"Erciyes Üniversitesi'nde Bilgisayar Bilimi ve Mühendisliği Öğrencisi",
      "busra":"Sabancı Üniversitesi'nde Veri Bilimi Master Öğrencisi ve Garanti BBVA'da Veri Bilimci",
      "busecarik":"Sabancı Üniversitesi'nde Bilgisayar Bilimi ve Mühendisliği Master Öğrencisi",
      "asuman":"Sabancı Üniversitesi'nde Moleküler Biyoloji ve Genetik Öğrencisi",
      "busek":"Veri Bilimi Master Öğrencisi ve ÇiçekSepeti'nde Veri Analisti",
      "elifoz": "Acıbadem Üniversitesinde Moleküler Biyoloji ve Genetik Öğrencisi",
      "speakers_ab":"WiDS Istanbul bu yıl 14 konuşmacıya ev sahipliği yapacaktır.",
      "ozge_is":"Instacart'da Kıdemli Veri Bilimci",
      "selen":"Stanford Üniversitesi Tıp Fakütesi'nde Araştırmacı",
      "burcu":"LinkedIn Şirketi Anti-Abuse AI'da Kıdemli Makine Öğrenmesi Mühendisi,",
      "suveyda":"McKinsey & Company Şirketi'nde Uzman",
      "pinar":"Hacettepe Üniversitesi'nde Profesör ve Bilgisayar Mühendisliği Başkanı",
      "gozde":"İstanbul Teknik Üniversitesi'nde Yapay Zeka & Veri / Bilgisayar Mühendisliği Profesörü; ITU AI Center Kurucu Üyesi",
      "sera":"Philip Morris International Şirketi'nde Veri Bilimci",
      "pelin":"JotForm Şirketi'nde Jr Veri Analisti, ODTÜ'de Veri Bilimi MSc",
      "damla":"AppNava Şirketi'nde CEO, Kurucu Ortak",
      "mina":"UP School Kurucusu, ed-tech start-up",
      "seyhan":"SK hynix America Inc. Şirketi'nde Principal Algorithm Araştırma Mühendisi",
      "pinar_er":"Commencis Şirketi'nde Veri Bilimci",
      "fatma":"Koç Üniversitesi'nde Doçent",
      "wids":"Veri Biliminde Kadınlar",
      "conference":"Konferansı 2021",
      "place":"ISTANBUL, TÜRKİYE",
      "virtual":"SANAL ETKİNLİK",
      "register2":"KAYIT OL",
      "spe": "Konuşmacı",
      "team": "Takım Üyesi",
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