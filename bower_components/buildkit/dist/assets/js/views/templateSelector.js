define([
  'jquery',
  'underscore',
  'backbone',
  'views/base',
  'velocity',
  'lib/breakpoints'
],
function($, _, Backbone, BaseView, Velocity, Breakpoints) {

  var TemplateSelectorView = BaseView.extend({

    templateStyleParent: null,
    templateRows: null,
    templateDetails: null,

    events: {
      'click .js-ts-style-trigger' : 'templateClick',
      'click .js-ts-headline-trigger' : 'revealMobileDetails',
      'click .js-ts-details-close-btn' : 'closeClick',
      'click .js-slide-nav-item': 'slideItemClick',
      'click .js-ts-nav-item': 'navClick'
    },

    initialize: function() {
      this.templateStyleParent = this.$el.find('.js-select-item');
      this.templateRow = this.$el.find('.js-template-row');
      this.templateDetails = this.$el.find('.js-template-details');
    },

    initDetailSlides: function(detailContent) {
      detailContent.find('.js-slide-image:first').addClass('active');
      detailContent.find('.js-slide-nav-item:first').addClass('active');
    },

    scrollPage: function(detailContent) {
      detailContent.velocity("scroll", { duration: 1000, easing: "easeOutQuint" })
    },

    activateDetails: function(detailsID, parentRow) {
      var detailContent = parentRow.find('#' + detailsID);

      detailContent.addClass('active'); 
      this.initDetailSlides(detailContent);
      this.scrollPage(detailContent);
    },

    deactivateDetails: function(parentRow) {
      parentRow.find('.template-selector__styles-details').removeClass('active');
    },

    activateTemplate: function(parent, parentRow, detailsID) {
      parent.find('.ts__styles-select_item-wrap').toggleClass('active');
      parent.find('.ts__option-item--details a').toggleClass('active');
      parent.find('.template-selector__content').toggleClass('active');
    },

    deactivateTemplate: function(parentRow) {
      parentRow.find('.js-select-item .active').removeClass('active');
    },

    activateSlide: function(slideID, parentRow) {
      parentRow.find('.js-slide-image[data-id="' + slideID + '"]').addClass('active');
      parentRow.find('.js-slide-nav-item[data-id="' + slideID + '"]').addClass('active');
    },

    deactivateSlide: function(parentRow) {
      parentRow.find('.js-slide-image.active').removeClass('active');
      parentRow.find('.js-slide-nav-item.active').removeClass('active');
    },

    //-----------------------------------------------------------------------------

    navClick: function(e) {
      this.$el.find('.js-type-wrap').removeClass('active');
      this.$el.find('.js-type-wrap[data-template-type="' + $(e.currentTarget).data('templateSelect') + '"]')
        .addClass('active');

      this.$el.find('.js-ts-nav-item').removeClass('active');
      $(e.currentTarget).addClass('active');
    },

    slideItemClick: function(e) {
      e.preventDefault();
      var newSlideID = $(e.currentTarget).data('id');
      var parentRow = $(e.currentTarget).closest(this.templateRow);

      this.deactivateSlide(parentRow);
      this.activateSlide(newSlideID, parentRow);
    },

    templateClick: function(e) {
      e.preventDefault();

      var parent = $(e.currentTarget).hasClass('js-select-item') ? $(e.currentTarget) : $(e.currentTarget).closest(this.templateStyleParent);
      var parentRow = $(e.currentTarget).closest(this.templateRow);
      var detailsID = parent.data('id');

      this.deactivateTemplate(parentRow);
      this.deactivateDetails(parentRow);
      this.deactivateSlide(parentRow);

      this.activateTemplate(parent, parentRow, detailsID);
      this.activateDetails(detailsID, parentRow);
    },

    closeClick: function(e) {
      var parentRow = $(e.currentTarget).closest(this.templateRow);

      this.deactivateTemplate(parentRow);
      this.deactivateDetails(parentRow);
    },

    revealMobileDetails: function(e) {
      var parentRow = $(e.currentTarget).closest(this.templateRow);

      parentRow.find('.ts__headline').toggleClass('active');
      parentRow.find('.template-selector__content').toggleClass('active');

      if(parentRow.find('.ts__headline').hasClass('active')) {
        $(e.currentTarget).velocity("scroll", { duration: 1000, easing: "easeOutQuint" });
      }
    },


  });


  return TemplateSelectorView;

});
