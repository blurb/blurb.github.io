define([
  'jquery',
  'underscore',
  'backbone',
  'views/base'
],
function($, _, Backbone, BaseView) {

  var SearchView = BaseView.extend({

    $form: null,

    events: {
      'click': 'openSearch',
      'click .js-search-close': 'closeSearch'
    },

    initialize : function(){
      this.$form = this.$el.find($('.js-search-form'));
    },

    openSearch: function(event){
      if( $('.is-open').length && $(event.target).parents('.utility__list-item--search').length //main site
          || 
          $('.is-open').length && $(event.target).parents('.js-controls-search').length //blog
      )
        return;
      else{
        this.$el.toggleClass('is-open');
        this.$form.toggleClass('active');
      }
    },

    closeSearch: function(e){
      this.$form.removeClass('active');
      this.$el.removeClass('is-open');
      e.stopPropagation();
    }

  });


  return SearchView;

});
