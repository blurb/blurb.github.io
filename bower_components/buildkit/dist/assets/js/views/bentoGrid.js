define([
  'jquery',
  'underscore',
  'backbone',
  'views/base'
],
function($, _, Backbone, BaseView) {

  var BentoGridView = BaseView.extend({

    events: {
      'click .js-load-more': 'loadMoreClick'
    },

    initialize: function() {
    },

  //-----------------------------------------------------------------------------

    loadMoreClick: function(e)
    {
      this.$el.find('.js-load-more').css('display','none');
      this.$el.find('.js-blurb-stories').css('display','inline-block');
    }

  });


  return BentoGridView;

});
