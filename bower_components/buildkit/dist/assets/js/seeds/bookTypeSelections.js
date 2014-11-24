define([], function() {

  /*
    Seed data for book types
  */
  return [

    {
      type: 'photo_book',

      name: 'Photo Book',
      bookTypes: [
        'standard_landscape', 
        'standard_portrait_true8x10', 
        'square',
        'large_square', 
        'large_landscape'
      ],
      coverTypes: ["softcover", "dustjacket", "imagewrap"],
      paperTypes: [
        'premium_matte_paper',
        'standard_paper',
        'premium_lustre_paper',
        'pro_medium_gloss_paper',
        'pro_uncoated_paper'
      ],
      endsheetTypes: [
        "standard_mid_grey_endsheet",
        "pro_white_endsheet",
        "pro_charcoal_endsheet",
        "pro_light_grey_endsheet",
        "pro_black_endsheet"
      ],
      linenTypes: [
        "pro_charcoal_linen_covering",
        "pro_oatmeal_linen_covering",
        "standard_grey_linen_covering",
        "standard_black_linen_covering"
      ],
      logoTypes: [
        'true',
        'false'
      ],
      imgURL: 'img/pricing/book_type_selections/photo_book.png'
    },

    {
      type: 'trade_book', 
      name: 'Trade Book', 
      bookTypes: [
        'pocket', 
        'trade',
        'standard_portrait_true8x10'
      ],
      coverTypes: ["softcover", "dustjacket", "imagewrap"],
      paperTypes: [
        'economy_trade_bw_matte_paper',
        'economy_trade_bw_cream_matte_paper',
        'economy_trade_matte_paper',
        'standard_trade_matte_paper',
        'standard_trade_bw_matte_paper'
      ],
      endsheetTypes: [
        "standard_white_endsheet"
      ],
      linenTypes: [
        "standard_grey_linen_covering"
      ],
      logoTypes: [
        'true',
        'false'
      ],
      imgURL: 'img/pricing/book_type_selections/trade_book.png'
    },


    {
      type: 'magazine', 
      name: 'Magazine', 
      bookTypes: ['magazine'],
      coverTypes: ["softcover"],
      paperTypes: [
        'magazine_paper',
        'velvet_paper'
      ],
      endsheetTypes: [],
      linenTypes: [],
      logoTypes: [
        'true',
        'false'
      ],
      imgURL: 'img/pricing/book_type_selections/magazine.png'
    }

  ];
});
