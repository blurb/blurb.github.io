define([
  'jquery',
  'underscore',
  'backbone',
  'views/base',
  'collections/bookTypes',
  'collections/coverTypes',
  'collections/paperTypes',
  'collections/linenTypes',
  'collections/endsheetTypes',
  'collections/bookPrices',
  'text!templates/pricingDev.html'
],
function(
  $, 
  _, 
  Backbone, 
  BaseView,
  bookTypesCollection,
  coverTypesCollection,
  paperTypesCollection,
  linenTypesCollection,
  endsheetTypesCollection,
  BookPricesCollection,
  template
) {


  $.fn.serializeObject = function () {
    "use strict";
    var result = {};
    var extend = function (i, element) {
      var node = result[element.name];
      // If node with same name exists already, need to convert it to an array as it
      // is a multi-value field (i.e., checkboxes)
      if ('undefined' !== typeof node && node !== null) {
        if ($.isArray(node)) {
          node.push(element.value);
        } else {
          result[element.name] = [node, element.value];
        }
      } else {
        if(element.value.length > 0) {
          result[element.name] = element.value;  
        }
      }
    };
    $.each(this.serializeArray(), extend);
    return result;
  };



  var PricingDevView = BaseView.extend({

    errors: [],
    template: template,

    events: {
      'submit #pricing-form': 'submitQuery'
    },

    initialize: function() {

      this.queryAttributes = {
        pages: 20, 
        book_type: 'standard_landscape',
        cover_type: 'dustjacket',
        paper_type: 'standard_paper',
        clu: 'true'
      };

      this.getBookPrices();


    },

    getBookPrices: function() {
      this.errors = [];
      this.bookPrices = new BookPricesCollection();
      console.log(this.queryAttributes);
      this.bookPrices.getBookPrices(
        this.queryAttributes,
        function(collection, response, options) {
          
          if($(response).find('error').length) {
            $(response).find('error').each(
              _.bind(function(index, value) {
                this.errors.push({
                  parameter: $(value).find('parameter').text(),
                  message: $(value).find('message').text()
                });
              }, this)
            );
          }

          // console.log(this.bookPrices);
          this.render();

        }, 
        function(collection, response, options) {
          console.log('boo', response);
        },
        this
      ); 
    },

    submitQuery: function(e) {
      e.preventDefault();
      this.$el.find('#results').text('loading...')
      this.queryAttributes = $('#pricing-form').serializeObject();
      this.getBookPrices();
    },

    serialize: function() {
      return {
        bookTypesCollection: bookTypesCollection,
        coverTypesCollection: coverTypesCollection,
        paperTypesCollection: paperTypesCollection,
        linenTypesCollection: linenTypesCollection,
        endsheetTypesCollection: endsheetTypesCollection,
        bookPrices: this.bookPrices,
        queryAttributes: this.queryAttributes,
        errors: this.errors
      }
    }

  });


  return PricingDevView;

});
