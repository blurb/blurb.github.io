define([], 
  function() {

  /*
    Seed data for cover types
    - Ordered as they appear
  */
  return [
    {
      type: 'softcover',  // photo
      name: 'Softcover',
      endSheets: false, 
      coverLinens: false, 
      description: 'lorem ipsum...',
      imgURL: 'img/pricing/covers/23_cover_softcover.png'
    },
    {
      type: 'dustjacket', 
      name: 'Dust Jacket',
      endSheets: true, 
      coverLinens: true, 
      description: 'lorem ipsum...',
      imgURL: 'img/pricing/covers/23_cover_hardcover-dust-jacket.png'
    },
    {
      type: 'imagewrap', 
      name: 'ImageWrap',
      endSheets: true, 
      coverLinens: false, 
      description: 'lorem ipsum...',
      imgURL: 'img/pricing/covers/23_cover_hardcover-imageWrap.png'
    }
  ];


});
