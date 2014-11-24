require([
  'underscore',
  'config'
], 

function(_, Config) {

  /*
    Miscellaneous helper methods
  */
  _.mixin({

    /*
      Removes null/falsey values from
      an object 
      ** Warning, this will remove a value of 0 **
    */
    compactObject: function(obj) {
      var newObj = _.clone(obj);
      _.each(newObj, function(val, key) {
        if(val === null) { 
          delete newObj[key]; 
        }
      });
      return newObj;
    },

    /*
      Returns the asset path
    */
    getAssetPath: function(relativePath) {
      var fullPath = Config.assetBasePath + relativePath;
      return fullPath;
    }

  });

});
