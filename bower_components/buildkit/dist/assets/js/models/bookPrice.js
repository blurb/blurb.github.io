define([
  'underscore',
  'backbone',
  'config'
],
function(_, Backbone, Config) {


  var BookPrice = Backbone.Model.extend({

    quantityDiscounts: Config.quantityDiscounts,

    consumeXML: function(xml) {

      var prices = [];
      $xml = $(xml);
      
      $xml.find('prices price').each(function() {
        prices.push({
          symbol: $(this).attr('symbol'),
          value: $(this).attr('value'),
          taxIncluded: $(this).attr('tax_included'),
          currency: $(this).attr('currency')
        });
      });

      this.set({
        coverType: $xml.find('cover-type').text(),
        bookType: $xml.find('book-type').text(),
        paperType: $xml.find('paper-type').text(),
        linenType: $xml.find('linen-type').text(),
        endsheetType: $xml.find('endsheet-type').text(),
        customLogoUpgrade: $xml.find('custom-logo-upgrade').text(),
        pageBlock: {
          start: $xml.find('page-block start').text(),
          end: $xml.find('page-block end').text()
        },
        prices: prices
      });

    },

    roundMoney: function(value) {
      return Math.round(value * 100) / 100;
    },

    getPriceWithDiscount: function(price, quantity) {
      /* @TODO This feels a bit inefficient... */
      var discount = _.find(_.pairs(this.quantityDiscounts).reverse(), function(pair) {
        return pair[0] <= quantity;
      }, this)[1];

      // HACK: If this is EUR, the decimal point is a comma (despite it not
      // being that way in the API). Force-convert it back to a decimal point
      // before this operation so we don't get a €NaN
      if (/^[0-9\s.]+,[0-9]{1,2}$/.test(price + "")) {
        // Remove spaces and decimal points. Turn remaining commas into decimal points.
        price = price.replace(/ /, '').replace(/\./, '').replace(/,/, '.');
      }

      return this.roundMoney(price * discount);
    },

    getPriceByCurrency: function(type) {
      return _.find(this.get('prices'), function(price) {
        return price.currency === type;
      });
    },

    getFormattedPriceByCurrency: function(type, quantity) {
      var price = this.getPriceByCurrency(type);
      return price.symbol + this.getPriceWithDiscount(price.value, quantity).toFixed(2);
    },

    // getPriceByQtyInUSD: function(quantity) {
    //   return this.getFormattedPriceByCurrency('USD', quantity);
    // },

    getPriceByQty: function(quantity) {
      return this.getFormattedPriceByCurrency(Blurb.currency, quantity);
    }

  });


  return BookPrice;

});
