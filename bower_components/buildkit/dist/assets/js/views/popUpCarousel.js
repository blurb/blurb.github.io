define([
  'jquery',
  'underscore',
  'backbone',
  'views/base',
  'jquery_ui',
  'velocity',
  'lib/breakpoints'
],
function($, _, Backbone, BaseView, ui, Velocity, Breakpoints) {

  var PopUpCarouselView = BaseView.extend({

    slides: null,
    slideNavs: null,
    mediaGroups: null,
    mediaNavItems: null,
    leadContentGroups: null,
    leadContent: null,
    dragBar: null,
    dragTop: null,
    dragBottom: null,
    dragHandle: null,
    currentSlideID: null,
    currentSlideNavID: null,
    currentMediaID: null,
    currentMediaNavID: null,

    config: {
      mobileToggleSpeed: 500
    },

    events: {
      'click .js-slide-nav-item': 'slideNavClick',
      'click .js-media-nav-item': 'mediaNavClick',
      'click .js-mobile-toggle': 'mobileToggleClick'
    },

    initialize: function() {
      this.slides = this.$el.find('.js-slide-image');
      this.slideNavs = this.$el.find('.js-slide-nav');
      this.mediaGroups = this.$el.find('.js-media-group');
      this.mediaNavItems = this.$el.find('.js-media-nav-item');
      this.leadContentGroups = this.$el.find('.js-lead-content-group');
      this.leadContent = this.$el.find('.js-lead-content');
      this.dragBar = this.$el.find('.js-drag-bar');
      this.dragHandle = this.$el.find('.js-drag-handle');

      this.currentSlideID = this.$el.find('.js-slide-image:first').data('id');
      this.currentSlideNavID = this.$el.find('.js-slide-nav:first').data('id');
      this.currentMediaID = this.$el.find('.js-media-group:first').data('id');
      this.currentMediaNavID = this.$el.find('.js-media-nav-item:first').data('id');

      this.initActiveClasses();
      this.initDragBar();
      
      $(window).resize(_.throttle( _.bind(this.setDragBarLimits, this), 16));
    },


    initActiveClasses: function() {
      this.slides.filter('[data-id="' + this.currentSlideID + '"]').addClass('active');
      this.slideNavs.filter('[data-id="' + this.currentSlideNavID + '"]').addClass('active');
      this.mediaGroups.filter('[data-id="' + this.currentMediaID + '"]').addClass('active');
      this.mediaNavItems.filter('[data-id="' + this.currentMediaNavID + '"]').addClass('active');
      this.leadContentGroups.filter('[data-groupID="' + this.currentMediaNavID + '"]').addClass('active');
      this.leadContentGroups.filter('[data-groupID="' + this.currentMediaNavID + '"]').find('.js-lead-content').first().addClass('active');
      // this.leadContent.filter('[data-id="' + this.currentMediaNavID + '"]').addClass('active');
    },

    initDragBar: function() {
      var stopEv = _.bind(this.stopDrag, this);
      this.setDragBarLimits();

      this.dragHandle.draggable({
        axis: 'y',
        containment: 'parent',
        stop: stopEv
      });

      this.updateDragHandle(this.slideNavs.filter('.active').find('.js-drag-bullet:first'));
    },

    setDragBarLimits: function() {
      var dragContainer = this.$el.find('.js-slide-nav.active');
      var topItem = dragContainer.find('.js-drag-bullet:first');
      var bottomItem = dragContainer.find('.js-drag-bullet:last');
      var barHeight;

      this.dragTop = 
        Math.round((topItem.offset().top + (topItem.outerHeight() / 2)) - dragContainer.offset().top);  //.mediaNavItems.filter(':first');
      this.dragBottom = Math.round((bottomItem.offset().top  + (bottomItem.outerHeight() / 2)) - dragContainer.offset().top);  //.mediaNavItems.filter(':last');

      barHeight = this.dragBottom - this.dragTop;
      this.dragBar.css({'top': this.dragTop + 'px', 'height': barHeight})
    },

    updateDragHandle: function(bullet) {      
      var dragContainer = this.$el.find('.js-slide-nav.active');
      var newPosition = 
        (bullet.offset().top + (bullet.outerHeight() / 2)) - 
        (dragContainer.offset().top + (this.dragHandle.outerHeight() / 2));
      this.dragHandle.css({ top: newPosition }); 

      $('.js-drag-bullet').removeClass('active');
      bullet.addClass('active');
    },

    stopDrag: function() {
      var handle = this.slideNavs.filter('.active').find('.js-drag-handle');
      var bullets = this.slideNavs.filter('.active').find('.js-drag-bullet');
      var handlePosition = handle.offset().top + (handle.outerHeight()/2);
      var bulletPositions = [];
      var closestBullet = {};
      var targetBullet;

      /*
        Store the bullet data-ids and positions in an object
      */
      _.each(bullets, function(bullet){
        var tempBullet = {};

        tempBullet.id = $(bullet).parent('.js-slide-nav-item').data('id');
        tempBullet.offset = $(bullet).offset().top + ($(bullet).outerHeight()/2);

        bulletPositions.push(tempBullet);
      });

      /*
        Find the closest bullet and store it's data-id and position in an object
      */
      _.each(bulletPositions, function(bullet){
        if(closestBullet.id == null || Math.abs(bullet.offset - handlePosition) < Math.abs(closestBullet.offset - handlePosition)) {
          closestBullet.id = bullet.id;
          closestBullet.offset = bullet.offset;
        }
      });

      /*
        Update the slider
      */
      targetBullet = this.slideNavs.filter('.active').find('.js-slide-nav-item[data-id="' + closestBullet.id + '"] .js-drag-bullet');

      this.changeSlide(closestBullet.id);
      this.updateDragHandle(targetBullet);
    },

    changeSlideNav: function(slideNavID) {
      this.slideNavs.removeClass('active');
      this.slideNavs.filter('[data-id="' + slideNavID + '"]').addClass('active');
    },

    setMediaNavItem: function(mediaNavItemID) {
      this.mediaNavItems.removeClass('active');
      this.mediaNavItems.filter('[data-id="' + mediaNavItemID + '"]').addClass('active');
    },

    changeSlide: function(slideID) {
      this.slides.removeClass('active');
      this.slides.filter('[data-id="' + slideID + '"]').addClass('active');
    },

    changeMediaGroup: function(mediaID) {
      var toggleActive = _.bind(function() {
        this.mediaGroups.filter('.active').removeClass('active');
        this.mediaGroups.filter('[data-id="' + mediaID + '"]').addClass('active');
      }, this);

      if(Breakpoints.breakpoint == 'sm') {
        this.mediaGroups.filter('.active').find('.js-mobile-drawer')
        .velocity("slideUp", {
          duration: this.config.mobileToggleSpeed/2
        });
        this.mediaGroups.filter('[data-id="' + mediaID + '"]').find('.js-mobile-drawer')
        .velocity("slideDown", {
          delay: this.config.mobileToggleSpeed/2,
          duration: this.config.mobileToggleSpeed,
          easing: "easeOutQuint",
          complete: toggleActive()
        });
        this.$el.velocity("scroll", { 
          duration: this.config.mobileToggleSpeed,
          easing: "easeOutQuint"
        });
        
      } else {
        toggleActive()
      }
      
      this.currentSlideID = this.mediaGroups.filter('.active').find('.js-slide-image:first').data('id');
      this.changeSlide(this.currentSlideID);
    },

    changeLeadContent: function(mediaID) {
      var currentGroup = this.leadContentGroups.filter('.active');
      currentGroup.find('.js-lead-content').removeClass('active');
      currentGroup.find('.js-lead-content').filter('[data-id="' + mediaID + '"]').addClass('active');
    },

    changeLeadContentGroup: function(mediaID) {
      var currentGroup = this.leadContentGroups.filter('[data-groupID="' + mediaID + '"]');
      // Activate content group
      this.leadContentGroups.removeClass('active');
      currentGroup.addClass('active');
      // Activate first content child
      this.leadContent.removeClass('active');
      currentGroup.find('.js-lead-content').first().addClass('active');
    },

    //---------------------------------------------------------------------------

    slideNavClick: function(e) {
      e.preventDefault();
      var bullet = $(e.currentTarget).find('.js-drag-bullet');
      this.currentSlideID = $(e.currentTarget).data('id');

      this.changeSlide(this.currentSlideID);
      this.updateDragHandle(bullet);

      this.changeLeadContent(this.currentSlideID);
    },

    mediaNavClick: function(e) {
      e.preventDefault();
      this.currentMediaNavID = $(e.currentTarget).data('id')

      this.changeMediaGroup(this.currentMediaNavID);
      this.setMediaNavItem(this.currentMediaNavID);
      this.changeSlideNav(this.currentMediaNavID);
      this.changeLeadContentGroup(this.currentMediaNavID);
      this.setDragBarLimits();

      this.updateDragHandle(this.slideNavs.filter('.active').find('.js-drag-bullet:first'));
    },

    mobileToggleClick: function(e) {
      e.preventDefault();
      var parent = $(e.currentTarget).parents('.js-media-group');
      this.currentMediaNavID = parent.data('id');

      this.changeMediaGroup(this.currentMediaNavID);
      this.setMediaNavItem(this.currentMediaNavID);
      this.changeSlideNav(this.currentMediaNavID);
      this.changeLeadContentGroup(this.currentMediaNavID);
    }


  });


  return PopUpCarouselView;

});
