define([
  'jquery',
  'underscore',
  'backbone',
  'velocity',
  'views/base'
],
function($, _, Backbone, Velocity, BaseView) {

  var BookAnimationView = BaseView.extend({

    bookPoints: null,
    bookLayers: null,
    initDelay: 400,
    scrollListener: null,

    events: {
    },

    initialize: function() {
      this.bookPoints = this.$el.find('.js-book-point');
      this.bookLayers = this.$el.find('.js-book-layer')

      this.scrollListener = _.bind(this.isScrolledIntoView,this);
      $(window).scroll(this.scrollListener);
    },

    triggerBookPoints: function() {
      var delay = 0;
      _.each(this.bookPoints, function(bookPoint) {
        _.delay(this.animateBookPoint, delay, bookPoint);
        delay += this.initDelay;
      }, this);
    },

    triggerBookLayers: function() {
      var delay = 0;
      _.each(this.bookLayers, function(bookLayer) {
        _.delay(this.animateBookLayer, delay, bookLayer);
        delay += this.initDelay;
      }, this);
    },

    animateBookPoint: function(bookPoint) {
      $(bookPoint).velocity("fadeIn", {duration: 250, queue: false});
    },

    animateBookLayer: function(bookLayer) {
       $(bookLayer).velocity("fadeIn", {duration: 250, queue: false})
       .velocity({translateY: "100px"},{duration: 1750, queue: false, easing: "easeOutQuint"});
    },

    isScrolledIntoView: function()
    {

      var docViewTop = $(window).scrollTop();
      var docViewBottom = docViewTop + $(window).height();

      var elemTop = this.$el.offset().top;
      var elemBottom = elemTop + this.$el.height();

      // console.log('elemBottom: ', elemBottom,'docViewBottom: ',  docViewBottom, 'elemTop: ', elemTop, 'docViewTop: ', docViewTop );
      if((elemBottom <= docViewBottom) || (elemTop <= docViewTop)) {
        this.triggerAnimation();
        $(window).off('scroll',this.scrollListener);
      }
    },


  //-----------------------------------------------------------------------------

    triggerAnimation: function() {
      this.triggerBookPoints();
      this.triggerBookLayers();
    }

  });


  return BookAnimationView;

});
