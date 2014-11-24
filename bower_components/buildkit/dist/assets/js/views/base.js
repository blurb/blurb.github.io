define([
  'jquery',
  'underscore',
  'backbone',
  'lib/eventBroker',
  'i18n'
],
function($, _, Backbone, EventBroker, I18n) {

  var BaseView = Backbone.View.extend({

    broker: EventBroker.get(),

    setBrokerNamespace: function(namespace) {
      if(typeof namespace === 'undefined') {
        namespace = this.$el.data('event-namespace');
      }
      this.broker = EventBroker.get(namespace);
    },


    template: '',

    render: function() {
      var params = _.extend(this.serialize(), {_:_, $:$, I18n:I18n});
      
      this.$el.html( _.template(this.template, params) );
      this.trigger('render');
      this.afterRender();

      return this; 
    },

    /* !!!! */
    afterRender: function() {},

    serialize: function() {
      return {};
    }



  });


  return BaseView;

});
