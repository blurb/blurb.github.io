define([
  'underscore',
  'backbone'
],
function(_, Backbone) {

  var BookTypeSelection = Backbone.Model.extend({
    idAttribute: 'type',

    getHeading: function() {
      return this.get('name');
    },

    getImageURL: function() {
      return this.get('imgURL');
    }
  });

  return BookTypeSelection;

});
