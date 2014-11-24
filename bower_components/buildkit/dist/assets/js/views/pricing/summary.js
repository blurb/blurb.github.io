define([
  'jquery',
  'underscore',
  'backbone',
  'views/base',
  'text!templates/pricing/summary.html'
],
function($, _, Backbone, BaseView, Template) {

  var SummaryView = BaseView.extend({

    template: Template,

    pages: 20,
    error: null,

    icon: '',
    bookType: '',
    format: '',
    size: '',

    events: {
      'change .js-option-item': 'pageCountUpdate',
      'keyup .js-option-item': 'keyCheck'
    }, 

    initialize : function(options) {
      this.setupBrokerEvents();
      
      this.pages    = options.pages;
      this.errors   = options.errors;
    },

    setupBrokerEvents: function() {
      this.setBrokerNamespace('pricing');
      this.broker.register({
        'pricing:options:changed': 'optionsChanged',
        'pricing:option:pages:error': 'pagesError'
      }, this);
    },

    pagesError: function(message) {
      this.error = message;
      this.render();
    },

    pageCountUpdate: function(e) {
      this.pages = $(e.currentTarget).val();
      this.broker.trigger('pricing:option:change', 'pages', this.pages);
    },

    optionsChanged: function(options) {
      this.error = null;
      this.bookType = options.bookTypeSelection.getHeading();
      this.format = options.bookType.getHeading();
      this.size = options.bookType.getSubHeading();
      this.imageURL = options.bookType.getImageURL();
      this.render();
    },

    keyCheck: function(e) {
      if(e.keyCode == 13) {         // If the key pressed is "enter/return"...
        this.pageCountUpdate(e);    // Trigger the pageCountUpdate function
      }
    },

    serialize: function() {
      return {
        pages: this.pages,
        error: this.error,
        bookType: this.bookType,
        format: this.format,
        size: this.size,
        imageURL: this.imageURL
      };
    }

  });


  return SummaryView;

});
