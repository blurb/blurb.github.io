define([
  'underscore',
  'backbone',
  'models/bookPrice',
  'config'
],
function(_, Backbone, BookPrice, Config) {


  var BookPricesCollection = Backbone.Collection.extend({

    errors: [],
    model: BookPrice,

    hasErrors: function() {
      return this.errors.length > 0;
    },

    /*
      Takes a list of query attributes to retrieve a list of book prices.
    */
    getBookPrices: function(attributes, successCallback, errorCallback, callbackContext) {

      this.errors = []; // clear errors
      this.url = Config.pricingAPIEndpoint;

      /*
        Note: We compact the attributes object to remove 
        null values before sending it to the API
      */
      this.fetch({
        data: $.param(_.compactObject(attributes)),
        success: function() { successCallback.apply(callbackContext, arguments) },
        error: function() { errorCallback.apply(callbackContext, arguments) },
        dataType: "xml"
      });
      
    },

    /*
      Parses the XML response from the API
    */
    parse: function(response) {
      
      var models  = [];

      if($(response).find('error').length) {

        /* Capture errors if they exist... */
        $(response).find('error').each(
          _.bind(function(index, value) {
            this.errors.push({
              parameter: $(value).find('parameter').text(),
              message: $(value).find('message').text()
            });
          }, this)
        );

      } else {

        /* Parse the book price results */
        $(response).find('book-price').each(
          _.bind(function(BookPrice, models, index, value) {
            var bookPrice = new BookPrice();
            bookPrice.consumeXML(value);
            models.push(bookPrice);
          }, this, BookPrice, models)
        ); 

      }

      return models;

    }


  });


  return BookPricesCollection;

});
