define([
  'underscore',
  'backbone',
  'models/endsheetType',
  'seeds/endsheetTypes'
],
function(_, Backbone, EndsheetType, seedData) {
  
  /*
    This is a seeded, static collection that is returned as a 
    singleton instance as opposed to a class
  */
  var EndsheetTypesCollection = Backbone.Collection.extend({
    model: EndsheetType,

    filterByIDs: function(ids) {
      return _.filter(this.models, function(model) {
        return _.contains(ids, model.id);
      });
    }

  });
  return new EndsheetTypesCollection(seedData);
});
