define([
  'underscore',
  'backbone'
],
function(_, Backbone) {


  var PaperType = Backbone.Model.extend({
    idAttribute: 'type',

    getHeading: function() {
      return this.get('format');
    },

    getSubHeading: function() {
      return this.get('description');
    },

    getImageURL: function() {
      return this.get('iconUrl');
    },

    getTextureImgURL: function() {
      return this.get('textureUrl');
    }
    
  });


  return PaperType;

});
