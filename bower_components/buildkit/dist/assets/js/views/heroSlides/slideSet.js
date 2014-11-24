define([
  'jquery',
  'underscore',
  'backbone',
  'views/base'
],
function($, _, Backbone, BaseView, Template) {

  var SlideSetView = BaseView.extend({

    id: null,
    $items: null,

    intervals: [],
    rotateSpeed: 5000, // set the timeing for the autorotate carousel in milliseconds

    imagesLoaded: false,

    events: {
      'click .js-hero-slide-sub-link': 'subItemClick',
      'click .js-hero-slide-sub-item': 'slideClick'
    },

    initialize: function(options) {
      this.setupBrokerEvents();
      this.id = this.$el.data('id');
      this.$items = this.$('.js-hero-slide-sub-item');
    },

    loadImages: function() {
      if (this.imagesLoaded) { return; }

      this.$('img[data-src]').each(function() {
        var img = $(this);
        img.attr('src', img.data('src'));
      });

      this.imagesLoaded = true;
    },

    setupBrokerEvents: function() {
      this.setBrokerNamespace('herobento');
      this.broker.register({
        'item:change': 'changeItem'
      }, this);
    },

    changeItem: function(itemID) {
      if(itemID === this.id) {
        this.show();
        this.startAutoRotate();
      } else {
        this.hide();
        this.stopAutoRotate();
      }
    },

    hide: function() {
      this.$el.removeClass('active');
    },

    show: function() {
      this.loadImages();
      this.$el.addClass('active');
    },

    subItemClick: function(e) {
      var subItemID = $(e.currentTarget).data('id');
      this.changeSubItem(subItemID);
    },

    slideClick: function(e) {
      var currentSubItems = $(e.currentTarget).parents('.js-hero-slide-item').find('.js-hero-slide-sub-item');
      var totalSubItems = currentSubItems.index();
      var currentItem = currentSubItems.index($(e.currentTarget));

      this.stopAutoRotate();
      this.changeSubItem(
        currentItem >= totalSubItems ?
          currentSubItems.first().data('id') : $(e.currentTarget).data('id') + 1
      );
    },

    changeSubItem: function(subItemID) {
      this.deactivateSubItem();
      this.activateSubItem(subItemID);
    },

    // Remove active classes for old item and link
    deactivateSubItem: function() {
      var subLink = this.$('.js-hero-slide-sub-link.active');
      var subItem = this.$('.js-hero-slide-sub-item.active');
      subLink.removeClass('active');
      subItem.removeClass('active');
    },

    // Add active classes for new item and link given an ID
    activateSubItem: function(subItemID) {
      var subItem = this.$('.js-hero-slide-sub-item[data-id="' + subItemID + '"]');
      var subLink = this.$('.js-hero-slide-sub-link[data-id="' + subItemID + '"]');
      subLink.addClass('active');
      subItem.addClass('active');
    },

    startAutoRotate: function() {
      this.stopAutoRotate();
      this.intervals.push(
        setInterval(_.bind(this.autoChangeSubItem, this), this.rotateSpeed)
      );
    },

    stopAutoRotate: function() {
      while(this.intervals.length) {
        clearInterval(this.intervals.pop());
      }
    },

    autoChangeSubItem: function() {
       var currentSubItems = this.$('.js-hero-slide-item.active .js-hero-slide-sub-item');
       var nextSubItem = (currentSubItems.filter('.active').index() == currentSubItems.length - 1) ? this.$(currentSubItems[0]) : currentSubItems.filter('.active').next();
      this.changeSubItem(nextSubItem.data('id'));
    },


    serialize: function() {
      return this.item;
    }

  });

  return SlideSetView;

});
