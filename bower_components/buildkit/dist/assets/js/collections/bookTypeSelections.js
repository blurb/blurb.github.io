define([
  'underscore',
  'backbone',
  'models/bookTypeSelection',
  'seeds/bookTypeSelections'
],
function(_, Backbone, BookTypeSelection, seedData) {

  /*
    This is a seeded, static collection that is returned as a 
    singleton instance as opposed to a class
  */
  var BookTypeSelectionsCollection = Backbone.Collection.extend({
    model: BookTypeSelection

  });

  return new BookTypeSelectionsCollection(seedData);

});
