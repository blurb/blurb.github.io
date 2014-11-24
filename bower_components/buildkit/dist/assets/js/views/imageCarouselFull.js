define([
  'jquery',
  'underscore',
  'backbone',
  'views/base'
],
function($, _, Backbone, BaseView) {

  var ImageCarouselFullView = BaseView.extend({

    $items: null,
    itemCount: 0,

    events: {
      'click .js-carousel-control': 'navigate',
      'mouseenter .js-info-trigger': 'triggerInfo',
      'mouseleave .js-info-trigger': 'deactiveateInfo',
      'click .js-info-trigger': 'triggerInfo'
    },

    initialize: function() {
      this.setupBrokerEvents();
      this.$items = this.$el.find('.js-carousel-slide');
      this.itemCount = this.$items.length;
    },

    setupBrokerEvents: function() {
      this.setBrokerNamespace();
      this.broker.register({
        'item:change': 'changeItem'
      }, this);
    },

    changeItem: function(itemID) {
      this.$items.filter('.active').removeClass('active');
      this.$items.filter('[data-id="' + itemID + '"]').addClass('active');      
    },

    getCurrentSlideIndex: function() {
      return this.$items.index(
        this.$items.filter('.active')
      );
    },

    getSlideIDByIndex: function(index) {
      return this.$items.filter(':eq(' + (index) + ')').data('id');
    },

    navigate: function(e) {
      e.preventDefault();

      var gotoIndex;
      var direction = $(e.currentTarget).data('direction');
      var currentIndex = this.getCurrentSlideIndex();
      
      if(direction == 'next') {
        gotoIndex = currentIndex < this.itemCount - 1 ? currentIndex + 1 : 0;
      } else {
        gotoIndex = currentIndex == 0 ? this.itemCount - 1 :  currentIndex - 1;
      }

      this.broker.trigger('item:change', this.getSlideIDByIndex(gotoIndex));
    },

    triggerInfo: function(e)
    {
      var infoToggle = $(e.currentTarget);
      var infoParentSlide = infoToggle.parents('.js-carousel-slide');

      // if mobile...
      if($(document.documentElement).hasClass('touch'))
      {
        infoParentSlide.toggleClass('info-active');
        // debugger;
      }
      else // if mouse...
      {
        if(!infoParentSlide.hasClass('info-active'))
        {
          infoParentSlide.addClass('info-active');
          // debugger;
        }
      }

    },

    deactiveateInfo: function(e)
    {
      var infoToggle = $(e.currentTarget);
      var infoParentSlide = infoToggle.parents('.js-carousel-slide');
      // debugger;
      infoParentSlide.removeClass('info-active');
      // debugger;
    }

  });

  return ImageCarouselFullView;

});
