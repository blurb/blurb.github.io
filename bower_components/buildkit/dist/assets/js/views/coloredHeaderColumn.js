define([
  'jquery',
  'underscore',
  'backbone',
  'views/base',
  'qtip2',
  'lib/breakpoints'
],
function($, _, Backbone, BaseView, Qtip2, Breakpoints) {

  var ColoredHeaderColumnView = BaseView.extend({

    events: {
      'click .js-expand-trigger': 'triggerClick'
    },

    initialize: function() {

    },

  //-----------------------------------------------------------------------------

    triggerClick: function(e)
    {
      // console.log('click');
      if(Breakpoints.breakpoint != 'lg')
      {
        console.log(Breakpoints.breakpoint);
        var toggleParent = $(e.currentTarget).parent('.js-expand-wrap');
        var toggleContent = $(e.currentTarget).next('.js-expand-content');

        toggleParent.toggleClass('open');
        // toggleContent
      }
    }

  });


  return ColoredHeaderColumnView;

});
