define([
  'underscore',
  'backbone',
  'models/linenType',
  'seeds/linenTypes'
],
function(_, Backbone, LinenType, seedData) {
  
  /*
    This is a seeded, static collection that is returned as a 
    singleton instance as opposed to a class
  */
  var LinenTypesCollection = Backbone.Collection.extend({
    model: LinenType,

    filterByIDs: function(ids) {
      return _.filter(this.models, function(model) {
        return _.contains(ids, model.id);
      });
    }

  });

  return new LinenTypesCollection(seedData);

});
