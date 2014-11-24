define([
  'jquery',
  'underscore',
  'backbone',
  'lib/breakpoints',
  'views/base',
  'views/pricing/bookOptionsGroup',
  'views/pricing/bookOptions',
  'views/pricing/summary',
  'views/pricing/priceList',

  'text!templates/pricing/bookOptions/2Column.html',
  'text!templates/pricing/bookOptions/3Column.html',
  'text!templates/pricing/bookOptions/4Column.html',


  'collections/bookTypeSelections',
  'collections/bookTypes',
  'collections/coverTypes',
  'collections/paperTypes',
  'collections/linenTypes',
  'collections/endsheetTypes',
  'collections/bookPrices',
  'collections/logoTypes',

  'models/bookQuote'
],
function(

  $, _, Backbone, Breakpoints, BaseView, BookOptionsGroupView, BookOptionsView, SummaryView, PriceListView,

  Template2Column, Template3Column, Template4Column,

  BookTypeSelections, BookTypes, CoverTypes, PaperTypes, LinenTypes,
  EndsheetTypes, BookPricesCollection, LogoTypes,

  BookQuoteModel

) {

  var PricingView = BaseView.extend({

    /*
      Container elements for subviews
    */
    $optionsContainer: null,
    $summaryContainer: null,

    /*
      Array of bookOptionGroup views -
      each group has an array of child
      bookOption views
    */
    bookOptionGroups: [],

    /*
      Summary sub view
    */
    summaryView: null, 

    /*
      Price List sub view
    */
    priceListView: null,

    /*
      When the user is initially walking thru the 
      options we automatically collapse the previous
      option and then open the next. Once the user
      opts to manually select "choose" for a particular item,
      we override this
    */
    autoCollapse: true,

    /*
      The "quote" model that maintains the users'
      selection state
    */
    bookQuote: new BookQuoteModel(),


    /*
      Fixed summary variables
    */
    // summaryState: null,
    scrollTop: null,
    summaryWrap: null,
    summaryOuterWrap: null,
    summaryPosition: null,
    summaryDistance: null,
    summaryHeight: null,
    summaryBottom: null,
    optionsPosition: null,
    optionsDistance: null,
    optionsHeight: null,
    optionsBottom: null,
    bottomOffset: null,


    events: {
    },

    initialize : function() {

      /*
        Set defaults set on page if they exist
      */
      if(typeof Blurb.bookQuote !== 'undefined') {
        this.bookQuote.set(Blurb.bookQuote);
      }

      this.$optionsContainer = this.$el.find('.js-options-groups-container');
      this.$summaryContainer = this.$el.find('.js-summary-container');

      this.summaryWrap = this.$summaryContainer;
      this.summaryOuterWrap = this.$el.find('.js-summary');

      this.setupBrokerEvents();
      
      this.renderBookOptionGroups();
      this.renderSummary();
      this.renderPriceList();

      this.dispatchOptionsChanged();
      this.getBookPrices();

      this.setupSummaryParams();
      this.setFixedSummary();

      $(window).scroll(_.bind(this.refreshSummary,this));

    },

    /*
      Configures broker event listeners
    */
    setupBrokerEvents: function() {
      this.setBrokerNamespace('pricing');
      this.broker.register({
        'pricing:option:change': 'optionChange',
        'pricing:optiongroup:choose': 'onPricingGroupChoose'
      }, this);
    },


    /*
      Handles when the user clicks "choose" for a particular
      option group
    */
    onPricingGroupChoose: function(optionGroupView) {
      this.autoCollapse = false;
      this.revealPricingGroup(optionGroupView);
    },

    /*
      Handles when the user clicks "choose" for a particular
      option group
    */
    revealPricingGroup: function(optionGroupView) {
      _.each(this.bookOptionGroups, function(groupView) {
        if(groupView === optionGroupView) {
          groupView.toggle();
        } else {
          if(this.autoCollapse) {
            groupView.hide();  
          }
        }
      });
    },  

    /*
      Reveals the next option group based upon the last
      option selected
    */
    displayNextOptionGroup: function(lastAttributeSelected) {
      if(this.autoCollapse) {
        this.revealPricingGroup(
          this.nextOptionGroup(lastAttributeSelected)
        );
      }
    },

    /*
      This may be capable of being made more efficient..
    */
    nextOptionGroup: function(lastAttributeSelected) {
      for(var i = 0; i < this.bookOptionGroups.length-1; i++) {
        var optionViews = this.bookOptionGroups[i].optionViews;
        for(var j = 0; j < optionViews.length; j++) {
          if(optionViews[j].optionAttribute == lastAttributeSelected) {
            return this.bookOptionGroups[i+1];
          }
        }
      }

      return this.bookOptionGroups[this.bookOptionGroups.length-1];
    },

    /*
      Event handler for user selection / option changing 
    */
    optionChange: function(attribute, value) {

      /*
        Set the attribute on our model
      */
      this.bookQuote.set(attribute, value);

      /* 
        Update the option views -- selection changes
        can cause the options available to the user
        to change
      */
      this.updateOptionViews();

      /*
        Call to get book prices
      */  
      this.getBookPrices();

      /*
        Dispatch an event with the updated options
        selected
      */
      this.dispatchOptionsChanged();

      /*
        Display next option group
      */
      this.displayNextOptionGroup(attribute);

    },

    dispatchOptionsChanged: function() {

      this.broker.trigger('pricing:options:changed', {
        pages: this.bookQuote.get('pages'),
        bookTypeSelection: BookTypeSelections.get(this.bookQuote.get('book_type_selection')),
        bookType: BookTypes.get(this.bookQuote.get('book_type')),
        coverType: CoverTypes.get(this.bookQuote.get('cover_type')),
        paperType: PaperTypes.get(this.bookQuote.get('paper_type')),
        endsheetType: EndsheetTypes.get(this.bookQuote.get('endsheet_type')),
        linenType: LinenTypes.get(this.bookQuote.get('linen_type')),
        logoType: LogoTypes.get(this.bookQuote.get('clu'))
      });

    },

    /*
      Call to get book pricing from the API
    */
    getBookPrices: function() {

      /*
        Check to make sure the current choices are valid
      */
      if(this.bookQuote.valid()) {

        /*
          Let the world know we're calling to change
          prices
        */
        this.broker.trigger('pricing:changing');

        /*
          Call to get a pricing quote
        */
        this.bookPrices = new BookPricesCollection();
        this.bookPrices.getBookPrices(
          this.bookQuote.toJSON(),
          this.bookPricesSuccess,
          this.bookPricesError,
          this
        ); 

      } else {

        this.broker.trigger('pricing:options:invalid');

      }

      
    },

    /*
      Success callback for book prices call - see getBookPrices()
    */
    bookPricesSuccess: function(collection, response, options) {
      
      if(this.bookPrices.hasErrors()) {
        
        /*
          Passing the error through to the error handler
        */
        this.bookPricesError(collection, response, options);
        
      } else {
        if(collection.length === 1) {


          this.broker.trigger('pricing:change', collection.models[0]);

          // Trigger an event in Drupal's copy of jQuery if we have a reference
          // to it. Different instances of jQuery can't see each other's events.
          if (typeof $drupaljq !== "undefined") {
            $drupaljq(document).trigger('pricing:change', collection.models[0]);
          }


        } else {
          // @TODO Handle multiple prices being returned   
          if(collection.length === 0) {
            console.error("No pricing records returned!")
          }

          
          this.broker.trigger('pricing:options:invalid');
          
        }
      }

    }, 

    /*
      Error callback for book prices call - see getBookPrices()

      @TODO: When the Blurb API begins to return keys for error messages,
      this method will need to be modified. The views that currently listen
      to the events dispatched by this method expect for error.message to be 
      a key used for translation.

    */
    bookPricesError: function(collection, response, options) {
      console.log('Not so happy in blurb land... ', collection.errors);

      /*
        Convert error messages into downcased, underscored keys
      */
      _.each(collection.errors, function(error) {
        error.message = error.message.trim().replace(/([a-z\d])([A-Z]+)/g, '$1_$2').replace(/[-\s]+/g, '_').toLowerCase();
      }); 

      /*
        Dispatch global error message
      */
      this.broker.trigger('pricing:options:errors', collection.errors);

      /*
        Dispatch error events for each error
      */
      _.each(collection.errors, function(error) {
        this.broker.trigger('pricing:option:' + error.parameter + ':error', error.message);
      }, this);
    },


    /*
      Updates the option views when available
      choices change
    */
    updateOptionViews: function() {

      /*
        This is a little heavy, one could do checks to 
        see if these options need to update, and then re-render
        but for sake of simplicity we're just rerendering 
        all the views
      */
      _.each(
        _.flatten(_.pluck(this.bookOptionGroups, 'optionViews')), 
        function(optionView) {

          optionView.optionValue = this.bookQuote.get(optionView.optionAttribute);

          switch(optionView.optionAttribute) {
            case 'book_type_selection':
              break;
            case 'book_type':
              optionView.collection = BookTypes.filterByIDs(this.bookQuote.availableBookTypes());
              optionView.render();
              break;
            case 'cover_type':
              optionView.collection = CoverTypes.filterByIDs(this.bookQuote.availableCoverTypes());
              optionView.render();
              break;
            case 'paper_type':
              optionView.collection = PaperTypes.filterByIDs(this.bookQuote.availablePaperTypes());
              optionView.render();
              break;
            case 'endsheet_type':
              optionView.collection = EndsheetTypes.filterByIDs(this.bookQuote.availableEndsheetTypes());
              optionView.render();
              break;
            case 'linen_type':
              optionView.collection = LinenTypes.filterByIDs(this.bookQuote.availableLinenTypes());
              optionView.render();
              break;
            case 'clu':
              // optionView.collection = LogoTypes.filterByIDs(this.bookQuote.availableLogoTypes());
              optionView.render();
              break;
          }

        },
        this
      );
  
      /*
        Update page count on summary view if necessary
      */
      if(this.summaryView.pages !== this.bookQuote.get('pages')) {
        this.summaryView.pages = this.bookQuote.get('pages');
        this.summaryView.render();
      }
  

    },

    /*
      Render all the option groups
    */
    renderBookOptionGroups: function() {
      this.renderBookTypes();
      this.renderBookSizes();
      this.renderBookCovers();
      this.renderBookPapers();
      this.renderBookCustomOptions();
    },

    /*
      Render the book types section
    */
    renderBookTypes: function() {
      this.appendOptionGroup(
        new BookOptionsGroupView({ 
          header: I18n.t('pricing.book_types'),
          visible: true,
          optionViews: [
            new BookOptionsView(
              {
                template: Template3Column,
                collection: BookTypeSelections.models,
                optionAttribute: 'book_type_selection',
                optionValue: this.bookQuote.get('book_type_selection')
              }
            )
          ]
        }) 
      );
    },

    /*
      Render the book sizes section
    */
    renderBookSizes: function() {
      this.appendOptionGroup(
        new BookOptionsGroupView({ 
          header: I18n.t('pricing.size'),
          visible: true,
          optionViews: [
            new BookOptionsView(
              {
                template: Template4Column,
                collection: BookTypes.filterByIDs(this.bookQuote.availableBookTypes()),
                optionAttribute: 'book_type',
                optionValue: this.bookQuote.get('book_type')
              }
            )
          ]
        }) 
      );
    },

    /*
      Render the book covers section
    */
    renderBookCovers: function() {
      this.appendOptionGroup(
        new BookOptionsGroupView({ 
          header: I18n.t('pricing.covers'),
          optionViews: [
            new BookOptionsView(
              {
                template: Template3Column,
                collection: CoverTypes.filterByIDs(this.bookQuote.availableCoverTypes()),
                optionAttribute: 'cover_type',
                optionValue: this.bookQuote.get('cover_type')
              }
            )
          ]
        }) 
      );
    },

    /*
      Render the book papers section
    */
    renderBookPapers: function() {
      this.appendOptionGroup(
        new BookOptionsGroupView({ 
          header: I18n.t('pricing.papers'),
          optionViews: [
            new BookOptionsView(
              {
                template: Template2Column,
                collection: PaperTypes.filterByIDs(this.bookQuote.availablePaperTypes()),
                optionAttribute: 'paper_type',
                optionValue: this.bookQuote.get('paper_type')
              }
            )
          ]
        }) 
      );
    },

    /*
      Render the custom options section
    */
    renderBookCustomOptions: function() {
      this.appendOptionGroup(
        new BookOptionsGroupView({ 
          header: I18n.t('pricing.custom_options'),
          optionViews: [
            new BookOptionsView(
              {
                header: I18n.t('pricing.logo'),
                template: Template2Column,
                // collection: LogoTypes.filterByIDs(this.bookQuote.availableLogoTypes()),
                collection: LogoTypes.models,
                optionAttribute: 'clu',
                optionValue: this.bookQuote.get('clu')
              }
            ),
            new BookOptionsView(
              {
                header: I18n.t('pricing.end_sheets'),
                template: Template2Column,
                collection: EndsheetTypes.filterByIDs(this.bookQuote.availableEndsheetTypes()),
                optionAttribute: 'endsheet_type',
                optionValue: this.bookQuote.get('endsheet_type')
              }
            ),
            new BookOptionsView(
              {
                header: I18n.t('pricing.cover_linens'),
                template: Template2Column,
                collection: LinenTypes.filterByIDs(this.bookQuote.availableLinenTypes()),
                optionAttribute: 'linen_type',
                optionValue: this.bookQuote.get('linen_type')
              }
            )

          ]
        }) 
      );
    },

    /*
      Appends an option group to the DOM 
    */
    appendOptionGroup: function(optionGroupView) {
      this.bookOptionGroups.push(optionGroupView);
      optionGroupView.index = this.bookOptionGroups.length;
      this.$optionsContainer.append(optionGroupView.render().el);
    },

    /*
      Render the summary sub view
    */
    renderSummary: function() {
      this.summaryView = new SummaryView({
        pages: this.bookQuote.get('pages')
      });
      this.$summaryContainer.append(this.summaryView.render().el);
    },

    /*
      Render the price list sub view
    */
    renderPriceList: function() {
      this.priceListView = new PriceListView();
      this.$summaryContainer.append(this.priceListView.render().el);
    },

    /*
      Sets the values for fixes summary
    */
    setupSummaryParams: function() {
      this.scrollTop = $(window).scrollTop();

      this.summaryPosition = this.summaryWrap.offset().top;
      this.summaryDistance = this.summaryPosition - this.scrollTop;
      this.summaryHeight = this.summaryWrap.height();
      this.summaryBottom = this.summaryPosition + this.summaryHeight;

      this.optionsPosition = this.$optionsContainer.offset().top;
      this.optionsDistance = this.optionsPosition - this.scrollTop;
      this.optionsHeight = this.$optionsContainer.height();
      this.optionsBottom = this.optionsPosition + this.optionsHeight;

      this.bottomOffset = $(document).height() - this.optionsBottom;
    },


    /*
      Refresh the summary
    */
    refreshSummary: function() {
      this.setupSummaryParams();
      this.setFixedSummary();
    },

    /*
      Fix and unfix summary
    */
    setFixedSummary: function() { 

      /*
        Fixed summary for desktop only
      */
      if(Breakpoints.breakpoint === 'lg') {
        /*
          Set the height of the summary outer wrap
        */
        this.summaryOuterWrap.css('height', this.optionsHeight);

        /*
          Follow regular layout flow
        */
        if(this.optionsDistance >= 0) {

          this.summaryWrap.removeClass('fixed');
          this.summaryWrap.removeClass('scroll-bottom');
          this.summaryWrap.removeAttr('style');
          this.summaryWrap.css('width', 'auto');

        } else {

          /*
            Set the summary to be fixed
          */
          if($(window).height() + $(document).scrollTop() < this.optionsBottom 
            && $(window).height() > this.optionsHeight 
            || this.optionsBottom - this.summaryHeight >= $(document).scrollTop()) {

            this.summaryWrap.addClass('fixed');
            this.summaryWrap.removeClass('fixed-bottom');
            this.summaryWrap.removeAttr('style');
            this.summaryWrap.css('width', this.summaryOuterWrap.outerWidth());
          }

          /*
            Absolute position the summary when bottom of options and summary align
          */
          if($(window).height() + $(document).scrollTop() >= this.optionsBottom 
            && this.optionsBottom <= this.summaryBottom 
            && this.optionsBottom - this.summaryHeight < $(document).scrollTop()) {

            this.summaryWrap.addClass('fixed-bottom');
            this.summaryWrap.removeAttr('style');
            this.summaryWrap.css('bottom', 0);
            this.summaryWrap.css('width', this.summaryOuterWrap.outerWidth());
          } 
        }

      /*
        For tablet and mobile, always follow regular layout flow
      */
      } else {
        this.summaryOuterWrap.css('height', 'auto');
        this.summaryWrap.removeClass('fixed');
        this.summaryWrap.removeClass('scroll-bottom');
        this.summaryWrap.removeAttr('style');
        this.summaryWrap.css('width', 'auto');
      }
    },

  });


  return PricingView;

});
