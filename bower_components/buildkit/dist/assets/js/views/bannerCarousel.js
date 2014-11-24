define([
  'jquery',
  'underscore',
  'backbone',
  'views/base',
  'lib/breakpoints',
  'velocity'
],
function($, _, Backbone, BaseView, Breakpoints, Velocity) {

  var BannerCarouselView = BaseView.extend({

    viewport: null,
    viewportWidth: null,
    carousel: null,
    carouselWidth: null,
    carouselItems: [],
    carouselItemWidth: null,
    carouselItemCount: null,
    carouselControls: null,

    config: {
      imageWidth: 57,   // % of viewport.outerWidth()
      slideSpeed: 300,  // milliseconds
      slideEaseing: 'easeOutExpo',
    },

    events: {
      'click .js-prev, .js-next': 'controlsClick'
    },

    initialize: function() {
      this.viewport = this.$el.find('.js-carousel-viewport');
      this.carousel = this.$el.find('.js-carousel-wrap');
      this.carouselItems = this.$el.find('.js-carousel-item');
      this.carouselItemCount = this.carouselItems.length;
      this.carouselControls = this.$el.find('.js-controller');

      var initCarouselParams = _.bind(this.initCarousel, this);
      var updateCarouselParams = _.bind(this.updateCarousel, this);

      initCarouselParams();

      $(window).resize(function(){
        updateCarouselParams();
      });
    },

    initCarousel: function() {
      this.setViewportWidth();
      this.setItemWidth();
      this.setCarouselWidth();
      this.setCarouselOffset();
      this.showCarousel();
    },

    updateCarousel: function() {
      this.setViewportWidth();
      this.setItemWidth();
      this.setCarouselWidth();
      this.updateCarouselOffset();
    },

    setViewportWidth: function() {
      this.viewportWidth = this.viewport.outerWidth();
    },

    setItemWidth: function() {
      if(Breakpoints.breakpoint === 'lg') {
        this.carouselItemWidth = Math.round(this.viewportWidth * (this.config.imageWidth/100)); // check the rounding
        this.carouselControls.css('left', this.carouselItemWidth);
      } else {
        this.carouselItemWidth = this.viewportWidth;
        this.carouselControls.css('left', 'auto');
      }
      this.carouselItems.css('width', this.carouselItemWidth);
    },

    setCarouselWidth: function() {
      this.carouselWidth = this.carouselItemCount * this.carouselItemWidth;
      this.carousel.css('width', this.carouselWidth);
    },

    setCarouselOffset: function() {
      $('.js-carousel-item:first').before($('.js-carousel-item:last'));
      this.carousel.stop().velocity({ translateX: -this.carouselItemWidth }, 0);
    },

    updateCarouselOffset: function() {
      this.carousel.stop().velocity({ translateX: -this.carouselItemWidth }, 0);
    },

    showCarousel: function() {
      this.$el.addClass('ready');
    },

    slideCarousel: function(direction) {

      if(direction === 'right') { 

        this.carousel
        .velocity({ translateX: -2 * this.carouselItemWidth },  // SLIDE RESET 
        {
          duration: 0,
          complete: function() { // SLIDE CYCLE
            var i = 1;
            while(i < 2){
              $('.js-carousel-item:first').before($('.js-carousel-item:last'));
              i++;
            }
          }
        })
        .velocity({ translateX: -this.carouselItemWidth }, // SLIDE ANIMATION
        {
          duration: this.config.slideSpeed,
          easing: this.config.slideEaseing
        });

      } else {                

        this.carousel
        .velocity({ translateX: -2 * this.carouselItemWidth }, // SLIDE ANIMATION
        {
          duration: this.config.slideSpeed,
          easing: this.config.slideEaseing
        })
        .velocity({ translateX: -this.carouselItemWidth },  // SLIDE RESET 
        {
          duration: 0,
          complete: function() {
            $('.js-carousel-item:last').after($('.js-carousel-item:first')); // SLIDE CYCLE
          }
        });

      }
    },

  //-----------------------------------------------------------------------------
  // Events

    controlsClick: function(e) {
      e.preventDefault();
      var direction = $(e.currentTarget).hasClass('js-prev') ? 'right' : 'left';

      this.slideCarousel(direction);
    }
  

  });


  return BannerCarouselView;

});
