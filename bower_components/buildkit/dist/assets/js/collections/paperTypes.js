define([
  'underscore',
  'backbone',
  'models/paperType',
  'seeds/paperTypes'
],
function(_, Backbone, PaperType, seedData) {
  
  /*
    This is a seeded, static collection that is returned as a 
    singleton instance as opposed to a class
  */
  var PaperTypeCollection = Backbone.Collection.extend({
    model: PaperType,

    filterByIDs: function(ids) {
      return _.filter(this.models, function(model) {
        return _.contains(ids, model.id);
      });
    }

  });

  return new PaperTypeCollection(seedData);

});
