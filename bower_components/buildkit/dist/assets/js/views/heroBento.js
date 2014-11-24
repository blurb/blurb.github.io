define([
  'jquery',
  'underscore',
  'backbone',
  'views/base',
  'velocity',
  'lib/breakpoints'
],
function($, _, Backbone, BaseView, Velocity, Breakpoints) {

  var heroBentoView = BaseView.extend({

    events: {
      'mouseenter .js-hero-bento-wrap': 'wrapHover',
      'mouseleave .js-hero-bento-wrap': 'wrapOut',
      'click .js-hero-bento-item': 'clickBentoItem'
    },

    animationTime: 16,
    bentoWrap: $('.js-hero-bento-stage'),
    bento: $('.js-hero-bento-images'),
    bentoWidth: 0,
    screenWidth: null,
    hoverPosX: null,
    scrollSpeed: null,
    isHovered: false,
    scrollLoop: [],
    offsetX: 0,
    activeBreakpoint: Breakpoints.breakpoint,

    initialize: function() {

      var setSliderWidth = _.bind(this.setSliderWidth, this);
      var updateScreenWidth = _.bind(this.getScreenWidth, this);
      var setActiveBreakpoint = _.bind(this.setActiveBreakpoint, this);
      var hoverRight = _.bind(this.rightHover, this);
      var hoverLeft = _.bind(this.leftHover, this);
      var stopScroll = _.bind(this.scrollStop, this);
      var loopDuration = this.animationTime;
      var loopArray = this.scrollLoop;


      this.setBrokerNamespace('herobento');
      this.getSliderWidth();

      setSliderWidth();
      updateScreenWidth();

      $('.js-arrow-right').hover(function(){
        loopArray.push(setInterval(hoverRight, loopDuration));
      }, function(){
        stopScroll();
      });

      $('.js-arrow-left').hover(function(){
        loopArray.push(setInterval(hoverLeft, loopDuration));
      }, function(){
        stopScroll();
      });

      $(window).resize(function(){
        updateScreenWidth();
        setActiveBreakpoint();
      });

    },

    setActiveBreakpoint: function()
    {
      if(this.activeBreakpoint != Breakpoints.breakpoint)
      {
        this.activeBreakpoint = Breakpoints.breakpoint;
        this.bentoWidth = 0;
        this.getSliderWidth();
        this.setSliderWidth();
      }
    },

    setSliderWidth: function()
    {
      this.bento.css('width', this.bentoWidth);
    },

    getScreenWidth: function()
    {
      this.screenWidth = $(window).width();
    },

    getSliderWidth: function(slideColumn)
    {
      var columns = this.bento.children('.js-hero-bento-column');
      var globalBentoWidth = this.bentoWidth;

      _.each(columns, function(element,index){
        globalBentoWidth += $(element).width();
      });

      this.bentoWidth = globalBentoWidth;
    },

  //-----------------------------------------------------------------------------

    leftHover: function()
    {
      var bentoLeft = this.bento.offset().left;
      if(bentoLeft <= -10) // If there is some content left to slide
      {
        this.offsetX -= 10;
        this.bento.velocity('scroll', { duration: this.animationTime, offset: this.offsetX, container: this.bentoWrap, axis: 'x'}, 'linear');
      } else {
        this.scrollStop();
      }
    },

    rightHover: function()
    {
      var bentoRight = (this.bento.offset().left + this.bentoWidth) - this.screenWidth;
      if(bentoRight >= 10) // If there is some content left to slide
      {
        this.offsetX += 10;
        this.bento.velocity('scroll', { duration: this.animationTime, offset: this.offsetX, container: this.bentoWrap, axis: 'x'}, 'linear');
      } else {
        this.scrollStop();
      }
    },

    scrollStop: function()
    {
      this.bento.velocity('stop');
      while(this.scrollLoop.length)
      {
        clearInterval(this.scrollLoop.pop());
      }
    },

    wrapHover: function(e)
    {
      $('.js-arrow-left').velocity({ opacity: 0.3 }, { duration: 300 });
      $('.js-arrow-right').velocity({ opacity: 0.3 }, { duration: 300 });
    },

    wrapOut: function(e)
    {
      $('.js-arrow-left').velocity({ opacity: 0 }, { duration: 300, delay: 600 });
      $('.js-arrow-right').velocity({ opacity: 0 }, { duration: 300, delay: 600 });
    },

    clickBentoItem: function(e)
    {
      var prevItem = this.bento.find('.active');
      var targetID = $(e.currentTarget).data('id');
      if(prevItem)
      {
        prevItem.removeClass('active');
      }
      $(e.currentTarget).addClass('active');
      this.broker.trigger('item:change', targetID);
    }

  });

  return heroBentoView;

});
