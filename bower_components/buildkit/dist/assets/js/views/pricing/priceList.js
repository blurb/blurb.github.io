define([
  'jquery',
  'underscore',
  'backbone',
  'views/base',
  'models/bookPrice',
  'text!templates/pricing/priceList.html',
  'config'
],
function($, _, Backbone, BaseView, BookPriceModel, Template, Config) {

  var PriceListView = BaseView.extend({

    template: Template,
    errors: null,
    blacklisted: null,
    bookPrice: null,

    events: {
    }, 

    initialize : function(options) {
      this.setupBrokerEvents();
    },

    setupBrokerEvents: function() {
      this.setBrokerNamespace('pricing');
      this.broker.register({
        'pricing:change': 'pricingChange',
        'pricing:changing': 'pricingChanging',
        'pricing:options:errors': 'hasErrors',
        'pricing:options:invalid': 'isBlacklisted'
      }, this);
    },

    pricingChanging: function() {
      this.bookPrice = null;
      this.errors = null;
      this.blacklisted = null;
      this.render();
    },

    pricingChange: function(bookPrice) {
      this.bookPrice = bookPrice;
      this.render();
    },

    hasErrors: function() {
      this.errors = true;
      this.render();
    },

    isBlacklisted: function() {
      this.blacklisted = true;
      this.render();
    },

    serialize: function() {
      return {
        bookPrice: this.bookPrice,
        errors: this.errors,
        blacklisted: this.blacklisted,
        discountRanges: Config.discountRanges()
      };
    }

  });


  return PriceListView;

});
