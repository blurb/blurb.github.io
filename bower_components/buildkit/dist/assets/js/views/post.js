define([
  'jquery',
  'underscore',
  'backbone',
  'views/base',
  'lib/breakpoints'
],
function($, _, Backbone, BaseView, Breakpoints) {

  var PostView = BaseView.extend({

    events: {
    },

    initialize: function() {

      var scrollPost = _.bind(this.setFixedSocial,this);

      // Scroll fix for navigation
      $(window).scroll(scrollPost);

      // IOS6 VH SHIM
      $(window).resize(function()
      {
        scrollPost();
      });

    },

  //-----------------------------------------------------------------------------

    setFixedSocial: function()
    {
      var scrollTop = $(window).scrollTop();
      var socialIcons = $('.post__social')
      var articlePosition = $('.post__main').offset().top;
      var distance = (articlePosition - scrollTop);
      var articleHeight = $('.post__main').height();
      var articleBottom = articlePosition + articleHeight;

      if(Breakpoints.breakpoint == 'lg')
      {
        if(distance < 0 && articleBottom - scrollTop >= 366){
          socialIcons.addClass('fixed');
          socialIcons.removeClass('scroll-bottom');
        } 
        else if(articleBottom - scrollTop < 366)
        {
          socialIcons.removeClass('fixed');
          socialIcons.addClass('scroll-bottom');
        } else {
          socialIcons.removeClass('fixed');
          socialIcons.removeClass('scroll-bottom');
        }
      }
    },

  });


  return PostView;

});
