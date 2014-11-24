define([
  'jquery',
  'underscore',
  'backbone',
  'views/base'
],
function($, _, Backbone, BaseView) {

  var BookOptionsView = BaseView.extend({

    template: "<!-- define a template! -->",

    optionValue: null,
    optionAttribute: null,
    header: '',
    collection: new Backbone.Collection(),

    events: {
      'click .js-option-item': 'itemClick'
    }, 

    initialize : function(options) {
      this.setBrokerNamespace('pricing');
      this.header             = options.header;
      this.template           = options.template || this.template;
      this.collection         = options.collection || this.collection;
      this.optionAttribute    = options.optionAttribute;
      this.optionValue        = options.optionValue;

    },

    itemClick: function(e) {
      e.preventDefault();
      this.optionValue = $(e.currentTarget).data('id');
      this.broker.trigger('pricing:option:change', this.optionAttribute, this.optionValue);
      this.render();
    },

    serialize: function() {
      return {
        header: this.header,
        collection: this.collection,
        optionValue: this.optionValue
      };
    }

  });


  return BookOptionsView;

});
