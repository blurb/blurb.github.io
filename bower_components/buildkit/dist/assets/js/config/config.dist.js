define([], function() {


  Blurb.config = Blurb.config || {};

  /*
    Config values for backbone app
  */
  return _.extend({
    
    /*
      Blurb pricing API endpoint
    */
    pricingAPIEndpoint: '/api/book_prices.xml',

    /*
      Asset Base Path
    */
    assetBasePath: '/assets/',


    /*
      Maps minimum quantity to cost adjustment (1 - discount amount)
      a value of -1 indicates the end of the discount ranges (UI shows "Get a quote")

      ** Ascending order by quantity is important!!
    */
    quantityDiscounts: {
      1:      1,
      10:     0.90,
      51:     0.85,
      101:    0.80,
      301:    -1
    },

    /*
      Returns an array of objects representing the discount
      ranges available - 

      the bottom range returns as:
      {
        min: 1,
        max: 19,
        discount: 0 // 0%
      }

      middle ranges return as: 
      {
        min: 20,
        max: 49,
        discount: 15 // 15%
      }

      the top range returns as:
      {
        min: 300,
        max: -1,
        discount: 0
      }

    */
    discountRanges: function() {
      var discountPairs = _.pairs(this.quantityDiscounts);
      return _.map(discountPairs, function(pair, index) {

        var quantity = pair[0];
        var discount = pair[1];

        if(discount < 0) {

          return {
            min: quantity,
            max: -1,
            discount: 0
          };

        } else {

          var discountAmount = Math.round((1 - discount) * 100);
          return {
            min: quantity,
            max: (discountPairs[index + 1][0]-1),
            discount: discountAmount
          }

        }

      });
    }

  }, Blurb.config);


});
