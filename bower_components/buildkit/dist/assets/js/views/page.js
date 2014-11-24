define([
  'jquery',
  'underscore',
  'backbone',
  'views/base',
  'stellar',
  'lib/breakpoints',
  'views/tooltips',
  'fancybox',
  'chosen'
],
function($, _, Backbone, BaseView, Stellar, Breakpoints, Tooltips, Fancybox) {

  var $doc = $(document);
  var $win = $(window);
  var $html = $(document.documentElement);
  var $ios6 = false;
  var $footerHeight = $('.footer').outerHeight();

  var PageView = BaseView.extend({

    events: {
      'click a[rel="external"]': 'openExternalWindow',
      'click .js-mobile-nav-toggle': 'mobileNavClick',
      'click .js-venobox': 'venoboxImgClick'
    },

    initialize: function() {
      this.initSubViews();
      this.initEvents();
      this.initPlugins();
      this.initToolTips();
    },

    initToolTips : function(){
      new Tooltips({
        el: this.el,
        selector: '.js-tooltip-target'
      });
    },

    /*
      Initialize sub-views which are read via
      a 'data-controller' attribute on an element.
      Typically in this application this will always be
      on div#main
    */
    initSubViews: function() {
      $('[data-controller]').each(function() {
        var controller = $(this).data('controller');
        var viewPath = 'views/' + controller;
        var el = $(this);
        require([viewPath], function(View) {
          var view = new View({el: el});
        });
      });
    },

    initEvents: function() {
      var scrollPage = _.bind(this.setFixedNav,this);
      var setHeight = _.bind(this.setModuleHeight,this);
      var setSticky = _.bind(this.setStickyFooter,this);
      var checkFooter = _.bind(this.checkFooterHeight,this);

      // Set the sticky footer margin
      setSticky();

      // iOS & iOS6 TEST
      Modernizr.addTest('ios6', function() {
        var v, ver = false;
        if (/iP(hone|od|ad)/.test(navigator.platform)) {
          v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/),
          ver = parseInt(v[1], 10);
          $html.addClass('ios');
        }
        if (ver == 6) {
          $ios6 = true;
        }
        if($ios6) {
          viewportHeight = $(window).height();
          setHeight(viewportHeight);
        }
        return $ios6;
      });

      // Scroll fix for navigation
      $win.scroll(scrollPage);

      $(window).resize(function() {
        scrollPage();
        checkFooter();

        // IOS6 VH SHIM
        if($ios6)
        {
          viewportHeight = $(window).height();
          setHeight(viewportHeight);
        }
      });
    },

    
    initPlugins: function() {
      // Stellar
      if(!Modernizr.touch)
      {
        $(window).stellar({
          responsive: true
        });
      }

      //initializing lightbox plugin on elements with '.js-fancyBox' class.
      this.$el.find('.js-fancybox').fancybox({ 
        openEffect: 'elastic',
        closeEffect: 'elastic', helpers: {
          title : {
            type: 'outside'
          },
          thumbs: {
            width: 50,
            height: 50
          }
        }
      });

      // Decorate select elements
      this.$el.find(".js-selectmenu").chosen({
        disable_search: true,
        inherit_select_classes: true
      })
    },



  //-----------------------------------------------------------------------------

    openExternalWindow: function(e) {
      window.open($(e.currentTarget).attr('href'));
      e.preventDefault();
    },


    mobileNavClick: function(e) {
      var wrapper = $('.js-inner-wrapper');

      if($('body').hasClass('nav-open')) {
        setTimeout(function() {wrapper.css('overflow-x', 'hidden')}, 300);
      }
      else {
        wrapper.css('overflow-x', 'visible');
      }
      $('body').toggleClass('nav-open');
    },


    setFixedNav: function() {
      var nav = $('.js-header--main');
      var navPosition = $('.header--utility').height();

      if(Breakpoints.breakpoint == 'sm') {
        nav.css({'position':'static'});
      }
      else {
        if($win.scrollTop() > navPosition){
          nav.css({'position':'fixed','top':'0'});
        } else {
          nav.css({'position':'relative'});
        }
      }
    },

    setModuleHeight: function(viewportHeight) {
      $('.browser-size-image').css('height', viewportHeight);
    },

    venoboxImgClick: function(e) {
      e.preventDefault();
    },

    checkFooterHeight: function() {
      var newFooterHeight = $('.footer').outerHeight();
      if(newFooterHeight != $footerHeight)
      {
        this.setStickyFooter();
      }
    },

    setStickyFooter: function() {
      $('main', $('body.blurb-main-site')).css('padding-bottom', $footerHeight);
    }
  });


  return PageView;

});
