define([
  'jquery',
  'underscore',
  'backbone',
  'views/base',
  'qtip2',
  'lib/breakpoints'
],
function($, _, Backbone, BaseView, Qtip2, Breakpoints) {

  var LanguageSelectView = BaseView.extend({

    events: {
      'click .js-lang-select-btn': 'toggleLanguageSelect'
    },

    initialize: function() {

    },

  //-----------------------------------------------------------------------------

    toggleLanguageSelect: function(e)
    {
      $('.js-lang-select-wrap').toggle();
    }

  });


  return LanguageSelectView;

});
