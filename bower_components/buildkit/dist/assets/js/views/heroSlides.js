define([
  'jquery',
  'underscore',
  'backbone',
  'velocity',
  'views/base',
  'views/heroSlides/slideSet'
],
function($, _, Backbone, velocity, BaseView, SlideSetView) {

  var HeroSlidesView = BaseView.extend({

    $intro: null,
    $carousel: null,

    events: {
    },

    initialize: function() {
      this.setupBrokerEvents();

      this.$intro = this.$el.find('.js-slides-intro');
      this.$carousel = this.$el.find('.js-hero-slides-carousel');
    },

    setupBrokerEvents: function() {
      this.setBrokerNamespace('herobento');
      this.broker.register({
        'item:change': 'changeItem'
      }, this);
    },

    changeItem: function(itemID) {
      this.$intro.addClass('hidden');
      this.$el.velocity("scroll", { duration: 1000, easing: "easeOutQuint" })
    }

  });


  return HeroSlidesView;

});
