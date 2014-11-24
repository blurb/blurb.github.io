define([
  'jquery',
  'underscore',
  'backbone',
  'views/base'
],
function($, _, Backbone, BaseView) {

  var BuildkitView = BaseView.extend({

    $tabs: null,

    events: {
      'click .js-source-toggle': 'sourceClick',
      'click .js-defaults-nav-link': 'defaultsNavClick'
    },

    initialize: function() {
    },

    sourceClick: function(e)
    {
      e.preventDefault();
      $(e.currentTarget).next('.highlight').slideToggle();
    },

    defaultsNavClick: function(e)
    {
      var targetID = $(e.currentTarget).data('section');
      $("html, body").animate({ 
        scrollTop: $('#' + targetID).offset().top - parseInt($('main.main').css('padding-top'),10) 
      }, 1000);
      e.preventDefault();
      $('.js-defaults-nav-link').removeClass('active');
      $(e.currentTarget).addClass('active');
    }

  });


  return BuildkitView;

});
