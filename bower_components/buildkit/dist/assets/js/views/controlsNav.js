define([
  'jquery',
  'underscore',
  'backbone',
  'views/base',
  'lib/breakpoints'
],
function($, _, Backbone, BaseView, Breakpoints) {

  var controlsNavView = BaseView.extend({

    events: {
      'click .js-parent-nav-link' : 'clickParentNavLink',
      'click .controls__nav__list' : 'expandNav' 
    },

  //-----------------------------------------------------------------------------

    expandNav: function(e) { //used in touch devices.
      var $el = $(e.currentTarget);
      $el.addClass('subnav-active');
    },

    clickParentNavLink: function(e)
    {
      if(Breakpoints.breakpoint != 'lg')
      {
        e.preventDefault();
        var subnav = $(e.currentTarget).next('.js-subnav');
        var parentListItem = $(e.currentTarget).parent('li');
        var subnavItems = subnav.children('li');
        var subnavHeight = 0;

        /*
        Calculate the height of the subnav based on the height
        of the child list-items.
        */
        subnavItems.each(function() {
          subnavHeight += $(this).outerHeight();
        });

        if(subnav.height() == 0)
        {
          subnav.css('height', subnavHeight);
          parentListItem.addClass('open');
        } else {
          subnav.css('height', '0px');
          parentListItem.removeClass('open');
        }

      }
    }

  });


  return controlsNavView;

});
