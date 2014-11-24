define([
  'jquery',
  'underscore',
  'backbone',
  'views/base'
],
function($, _, Backbone, BaseView) {

  var BrowserSizeImageView = BaseView.extend({

    events: {
      'click .js-next-arrow': 'nextArrowClick'
    },

    initialize: function() {
      var that = this;
    },

  //-----------------------------------------------------------------------------

    nextArrowClick: function(e)
    {
      var $all = $('.browser-size-image');
      var parent = $(e.currentTarget).parents('.browser-size-image');
      var next_module;
//      var next_module = parent.next('.browser-size-image');
      $all.each(function (index, current) {
        console.log($(current)[0]);
        console.log(parent[0]);
        if ($(current)[0] === parent[0]) {
          next_module = $all.eq(index + 1);

          // Break out of loop.
          return false;
        }
      });
      var position = next_module.offset();
      
      $("html, body").animate({scrollTop: position.top});
    }

  });


  return BrowserSizeImageView;

});
