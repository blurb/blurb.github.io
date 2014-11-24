define([
  'underscore',
  'backbone',
  'models/logoType',
  'seeds/logoTypes'
],
function(_, Backbone, LogoType, seedData) {

  /*
    This is a seeded, static collection that is returned as a 
    singleton instance as opposed to a class

    @TODO Rename to dimension 

  */
  var LogoTypesCollection = Backbone.Collection.extend({
    model: LogoType,

    filterByIDs: function(ids) {
      return _.filter(this.models, function(model) {
        return _.contains(ids, model.id);
      });
    }

  });

  return new LogoTypesCollection(seedData);

});
