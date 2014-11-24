define([
  'underscore',
  'backbone',
  'collections/bookTypeSelections',
  'collections/bookTypes',
  'collections/coverTypes',
  'seeds/blacklist'
],
function(_, Backbone, BookTypeSelections, BookTypes, CoverTypes, Blacklist) {

  /*
    This model represents the choices a user 
    has made in order to formulate a quote from 
    blurb api
  */
  var BookQuote = Backbone.Model.extend({

    defaults: {
      pages:                20, 
      book_type_selection:  'photo_book',
      book_type:            'standard_landscape',
      cover_type:           'dustjacket',
      paper_type:           'standard_paper',
      linen_type:           'pro_charcoal_linen_covering',
      clu:                  false,
      endsheet_type:        'standard_mid_grey_endsheet'
    },

    initialize: function() {
      /*
        We use once instead of on to avoid firing
        a sequence of change events since 
        validateSelectionChange() itself changes attributes - 
        see the end of validateSelectionChange() where
        once is setup again
      */
      this.once('change', this.validateSelectionChange, this);
    },

    /*
      When a selection changes, we need to check that the options
      available due to the selection change are still available.
      If not, we set to the first item in the set
    */
    validateSelectionChange: function() {


      var changeAttributes = {};

      if(!_.contains(this.availableBookTypes(), this.get('book_type'))) {
        this.set('book_type', this.availableBookTypes()[0]);
      }

      if(!_.contains(this.availablePaperTypes(), this.get('paper_type'))) {
        this.set('paper_type', this.availablePaperTypes()[0]);
      }

      if(!_.contains(this.availableCoverTypes(), this.get('cover_type'))) {
        this.set('cover_type', this.availableCoverTypes()[0]);
      }

      // if(!_.contains(this.availableLogoTypes(), this.get('clu'))) {
      //   debugger;
      //   this.set('clu', this.availableLogoTypes()[0]);
      // }


      /*
        Check if endsheet or linen type should be removed
      */
      if(!this.currentCoverType().get('endSheets')) {
        this.set('endsheet_type', null);
      } else if(!_.contains(this.availableEndsheetTypes(), this.get('endsheet_type'))) {
        this.set('endsheet_type', this.availableEndsheetTypes()[0]);
      }

      if(!this.currentCoverType().get('coverLinens')) {
        console.log('nulling out coverLinens');
        this.set('linen_type', null);
      } else if(!_.contains(this.availableLinenTypes(), this.get('linen_type'))) {
        this.set('linen_type', this.availableLinenTypes()[0]);
      }


      if(this.get('pages') < this.currentBookType().get('minPages')) {
        this.set('pages', this.currentBookType().get('minPages'));
      }

      if(this.get('pages') > this.currentBookType().get('maxPages')) {
        this.set('pages', this.currentBookType().get('maxPages'));
      }

      /*
        Put the change event back
      */
      this.once('change', this.validateSelectionChange, this);

    },


    /*
      Check values against the blacklist
    */
    valid: function() {
      return !(
        _.findWhere(Blacklist, {
          book_type: this.get('book_type'),
          cover_type: this.get('cover_type'),
          paper_type: this.get('paper_type')
        })
      );
    },


    /*
      Returns the current book type
    */
    currentBookType: function() {
      return BookTypes.get(this.get('book_type'));
    },

    currentCoverType: function() {
      return CoverTypes.get(this.get('cover_type'));
    },

    /*
      Returns the current book type selection model
    */
    currentBookTypeSelection: function() {
      return BookTypeSelections.get(this.get('book_type_selection'));
    },

    /*
      The following methods return the available options
      based on bookTypeSelection (aka Book Type in the future API)
    */
    availableBookTypes: function() {
      return this.currentBookTypeSelection().get('bookTypes');
    },

    availablePaperTypes: function() {
      return this.currentBookTypeSelection().get('paperTypes');
    },

    availableCoverTypes: function() {
      return this.currentBookTypeSelection().get('coverTypes');
    },

    // availableLogoTypes: function() {
    //   debugger;
    //   return this.currentBookTypeSelection().get('logoTypes');
    // },

    availableEndsheetTypes: function() {
      if(this.currentCoverType().get('endSheets')) {
        return this.currentBookTypeSelection().get('endsheetTypes');  
      } else {
        return [];
      }
      
    },

    availableLinenTypes: function() {
      if(this.currentCoverType().get('coverLinens')) {
        return this.currentBookTypeSelection().get('linenTypes');
      } else {
        return [];
      }
    }
    
  });

  return BookQuote;

});
