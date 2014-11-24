define([
  'underscore',
  'backbone'
],
function(_, Backbone) {

  var LogoType = Backbone.Model.extend({
    idAttribute: 'type',

    getHeading: function() {
      return this.get('name');
    },//,

    getSubHeading: function() {
      return;
      // return this.get('trimSize');
      // return '';
    },
    getTextureImgURL: function() {
      return this.get('textureUrl');
    },
     getImageURL: function() {
    //   return '***';
     return this.get('iconUrl');
    }
    
  });


  return LogoType;

});
