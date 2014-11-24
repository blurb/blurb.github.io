define([
  'underscore',
  'backbone',
  'models/bookType',
  'seeds/bookTypes'
],
function(_, Backbone, BookType, seedData) {

  /*
    This is a seeded, static collection that is returned as a 
    singleton instance as opposed to a class

    @TODO Rename to dimension 

  */
  var BookTypesCollection = Backbone.Collection.extend({
    model: BookType,

    filterByIDs: function(ids) {
      return _.filter(this.models, function(model) {
        return _.contains(ids, model.id);
      });
    }

  });

  return new BookTypesCollection(seedData);

});
