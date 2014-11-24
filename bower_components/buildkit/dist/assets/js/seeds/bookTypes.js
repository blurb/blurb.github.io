define([], function() {

  /*
    @TODO Rename to dimension
    Seed data for book types (will be 'dimension' in future releases)
    - Ordered as they appear
  */
  return [
    {
      type: 'pocket',
        minPages: 24,
        maxPages: 480,
        format: 'Pocket',
        trimSize: '5x8',
        bleedSizePoints: 'AAxBB',
        bleedSizePixels: 'AAxBB',
        iconUrl: 'img/pricing/size/23_size_5x8-0.png'
    },
    {
      type: 'trade',
        minPages: 24,
        maxPages: 480,
        format: 'Trade',
        trimSize: '6x9',
        bleedSizePoints: 'AAxBB',
        bleedSizePixels: 'AAxBB',
        iconUrl: 'img/pricing/size/23_size_6x9-0.png'
    },
    {
      type: 'standard_landscape',
        minPages: 20,
        maxPages: 440,
        format: 'Standard landscape',
        trimSize: '10x8',
        bleedSizePoints: 'AAxBB',
        bleedSizePixels: 'AAxBB',
        iconUrl: 'img/pricing/size/23_size_standard-landscape-0.png'
    },
    {
      type: 'standard_portrait_true8x10',
        minPages: 20,
        maxPages: 440,
        format: 'Standard Portrait',
        trimSize: '8x10',
        bleedSizePoints: 'AAxBB',
        bleedSizePixels: 'AAxBB',
        iconUrl: 'img/pricing/size/23_size_8x10-0.png'
    },
    {
      type: 'square',
        minPages: 20,
        maxPages: 440,
        format: 'Small Square',
        trimSize: '7x7',
        bleedSizePoints: 'AAxBB',
        bleedSizePixels: 'AAxBB',
        iconUrl: 'img/pricing/size/23_size_small-square-0.png'
    },
    {
      type: 'large_square',
        minPages: 20,
        maxPages: 440,
        format: 'Large Square',
        trimSize: '12x12',
        bleedSizePoints: 'AAxBB',
        bleedSizePixels: 'AAxBB',
        iconUrl: 'img/pricing/size/23_size_large-square-0.png'
    },
    {
      type: 'large_landscape',
        minPages: 20,
        maxPages: 440,
        format: 'Large Landscape',
        trimSize: '13x11',
        bleedSizePoints: 'AAxBB',
        bleedSizePixels: 'AAxBB',
        iconUrl: 'img/pricing/size/23_size_large-landscape-0.png'
    },
    {
      type: 'magazine',
        minPages: 20,
        maxPages: 240,
        format: 'Magazine',
        trimSize: '8.5x11',
        bleedSizePoints: 'AAxBB',
        bleedSizePixels: 'AAxBB',
        iconUrl: 'img/pricing/size/23_size_8.5x11-0.png'
    }
  ];
});
