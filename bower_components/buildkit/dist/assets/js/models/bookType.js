define([
  'underscore',
  'backbone'
],
function(_, Backbone) {

  /*
    @TODO Rename to dimension
  */
  var BookType = Backbone.Model.extend({
    idAttribute: 'type',

    getHeading: function() {
      return this.get('format');
    },

    getSubHeading: function() {
      return this.get('trimSize');
    },

    getImageURL: function() {
      return this.get('iconUrl');
    }
    
  });


  return BookType;

});
