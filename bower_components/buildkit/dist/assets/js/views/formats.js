define([
  'jquery',
  'underscore',
  'backbone',
  'views/base',
  'lib/breakpoints'
],
function($, _, Backbone, BaseView, Breakpoints) { // Qtip2) {

  var FormatsView = BaseView.extend({

    events: {
      'click .js-formats-toggle': 'formatsToggleClick',
      'click .js-tooltip-target': 'targetClick'
    },

    initialize: function() {
    },

  //-----------------------------------------------------------------------------

    formatsToggleClick: function(e)
    {
      var drawer = $('.js-formats-inner');
      drawer.slideToggle({
        duration: 300
      });
      this.$el.toggleClass('active');
    },

    targetClick: function(e)
    {
      if(Breakpoints.breakpoint == 'sm')
      {
        var scrollHeight = $(e.currentTarget).offset().top;
        $('html, body').animate({ scrollTop: scrollHeight }, 300);
      }
    }

  });


  return FormatsView;

});
