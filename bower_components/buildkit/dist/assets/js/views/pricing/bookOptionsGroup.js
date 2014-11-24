define([
  'jquery',
  'underscore',
  'backbone',
  'views/base',
  'text!templates/pricing/bookOptionsGroup.html'
],
function($, _, Backbone, BaseView, Template) {

  var BookOptionsGroupView = BaseView.extend({

    template: Template,

    $optionsContainer: null,

    header: '',
    optionViews: [],
    visible: false,
    index: 0,

    events: {
      'click .js-choose': 'choose'
    }, 

    initialize : function(options){
      this.setBrokerNamespace('pricing');
      this.header = options.header;
      this.optionViews = options.optionViews;
      this.visible = options.visible || this.visible;
    },

    toggle: function() {
      if(this.visible) {
        this.hide();
      } else {
        this.show();
      }
    },

    hide: function() {
      this.visible = false;
      this.$optionsContainer.slideUp(250);
    },

    show: function() {
      this.visible = true;
      this.$optionsContainer.slideDown(250);
    },

    choose: function(e) {
      this.broker.trigger('pricing:optiongroup:choose', this);
      e.preventDefault();
    },

    afterRender: function() {
      this.$optionsContainer = this.$el.find('.js-options-container');
      this.renderBookOptions();
    },

    renderBookOptions: function() {
      _.each(this.optionViews, function(optionView) {
        this.$optionsContainer.append(optionView.render().el);
      }, this);
    },

    serialize: function() {
      return {
        index: this.index,
        header: this.header,
        visible: this.visible
      };
    }

  });

  return BookOptionsGroupView;

});
