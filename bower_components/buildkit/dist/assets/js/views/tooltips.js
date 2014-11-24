define([
  'jquery',
  'underscore',
  'backbone',
  'views/base',
  'qtip2'
],
function($, _, Backbone, BaseView, Qtip2) {

  var TooltipsView = BaseView.extend({

    initialize: function(options) {
      this.initToolTips(options.selector);
    },

    initToolTips: function(selector){
      var that = this;

      this.$el.find(selector).each(function(i, el){
        
        var $el = $(el);
        $el.qtip({
          show: {
            event: 'click mouseenter',
            solo: true
          },
          hide: {
            event: 'click unfocus',
            delay: 1000,
            target: $el
          },
          content: {
            text: $el.siblings('.js-tooltip-text')
          },
          adjust: {
            resize: true // Can be ommited (e.g. default behaviour)
          },
          position: {
            viewport: $(window)
          }
        });
      });
      
    }

  });


  return TooltipsView;

});
