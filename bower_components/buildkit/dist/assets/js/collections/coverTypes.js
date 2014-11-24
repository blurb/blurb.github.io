define([
  'underscore',
  'backbone',
  'models/coverType',
  'seeds/coverTypes'
],
function(_, Backbone, CoverType, seedData) {

  /*
    This is a seeded, static collection that is returned as a 
    singleton instance as opposed to a class
  */
  var CoverTypesCollection = Backbone.Collection.extend({
    model: CoverType,

    filterByIDs: function(ids) {
      return _.filter(this.models, function(model) {
        return _.contains(ids, model.id);
      });
    }

  });

  return new CoverTypesCollection(seedData);

});
