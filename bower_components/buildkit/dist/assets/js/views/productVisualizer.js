define([
  'jquery',
  'underscore',
  'backbone',
  'views/base',
  'lib/breakpoints'
],
function($, _, Backbone, BaseView, Breakpoints) {

  var ProductVisualizerView = BaseView.extend({

    $items: null,
    itemCount: 0,
    selectedItem: null,
    currentBreakpoint: null,

    events: {
      'click .js-pv-sub-link': 'subItemClick',
      'click .mobile-accordion-trigger' : 'mobileAccordion'
    },

    initialize: function() {
      this.currentBreakpoint = Breakpoints.breakpoint;

      this.setupBrokerEvents();
      this.$items = this.$el.find('.js-pv-item');

      $( window ).resize(_.throttle( _.bind(this.updateBreakpoint, this), 16));
    },

    setupBrokerEvents: function() {
      this.setBrokerNamespace();
      this.broker.register({
        'subitem:change': 'changeSubItem' 
      }, this);
    },

    deactivateSubItem: function(subLink, subItem)
    {
      subLink.removeClass('active');
      subItem.removeClass('active');
    },

    activateSubItem: function(subLink, subItem)
    {
      subLink.addClass('active');
      subItem.addClass('active');
    },

  //-----------------------------------------------------------------------------

    subItemClick: function(e)
    {
      var subItemLink = $(e.currentTarget);
      var subItemID = $(e.currentTarget).data('id');
      var itemID = $(e.currentTarget).parents('.js-pv-item').data('id');
      this.broker.trigger('subitem:change', itemID, subItemID);
    },

    changeSubItem: function(itemID, subItemID)
    {
      var newID = itemID;
      var oldSubLink = this.$el.find('.js-pv-item.active .js-pv-sub-link.active');
      var oldSubItem = $('.js-pv-sub-item.active');
      var newSubItem = $('.js-pv-item[data-id="' + itemID + '"] .js-pv-sub-item[data-id="' + subItemID + '"]');
      var subItemLink = $('.js-pv-sub-link[data-id="' + subItemID + '"]');

      // Remove active classes for old item and link
      this.deactivateSubItem(oldSubLink, oldSubItem);

      // Add active classes for new item and link
      this.activateSubItem(subItemLink, newSubItem);
    },

    mobileAccordion : function(event){
      $item = $(event.target); //cache clicked arrow.
      this.$el.find('.js-pv-sub-item').removeClass('active'); //collapse all sub-items
      if($item.hasClass('active')){ //if target is cucrrently active, collapse it
        $item.removeClass('active')
        $item.next().removeClass('active')
      }
      else{
        this.$el.find('.mobile-accordion-trigger.active').removeClass('active'); //otherwise remove active from arrows, and expand the one clicked.
        $item.addClass('active')
        $item.next().addClass('active')
      }
    },

    updateBreakpoint : function(){
      if((Breakpoints.breakpoint != this.currentBreakpoint)){
        if( (this.currentBreakpoint == 'sm' && Breakpoints.breakpoint == 'md')
            ||
            (this.currentBreakpoint == 'md' && Breakpoints.breakpoint == 'sm')
        ){
          this.resetActiveItems();
        }
        this.currentBreakpoint = Breakpoints.breakpoint;
      }
    },

    resetActiveItems : function(){
      this.$el.find('.js-pv-sub-item').removeClass('active');
      this.$el.find('.mobile-accordion-trigger').removeClass('active');
      this.$el.find('.js-pv-sub-link').removeClass('active');


      this.$el.find('.js-pv-sub-link').first().addClass('active');
      this.$el.find('.js-pv-sub-item').first().addClass('active');
      this.$el.find('.mobile-accordion-trigger').first().addClass('active');
    }

  });


  return ProductVisualizerView;

});
