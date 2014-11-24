define([
  'jquery',
  'underscore',
  'backbone',
  'views/base'
],
function($, _, Backbone, BaseView) {

  var HorizontalTabsView = BaseView.extend({

    $tabs: null,

    events: {
      'click .js-tab-item': 'tabClick'
    },

    initialize: function() {
      this.setupBrokerEvents();
      this.$tabs = this.$el.find('.js-tab-item');
    },

    setupBrokerEvents: function() {
      this.setBrokerNamespace();
      this.broker.register({
        'item:change': 'changeItem'
      }, this);
    },

    changeItem: function(itemID) {
      this.$tabs.filter('.active').removeClass('active');
      this.$tabs.filter('[data-id="' + itemID + '"]').addClass('active');
    },

    tabClick: function(e) {
      e.preventDefault();
      var targetID = $(e.currentTarget).data('id');
      this.broker.trigger('item:change', targetID);
    }

  });


  return HorizontalTabsView;

});
