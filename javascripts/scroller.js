(function() {
  (function(jQuery) {
    return $(window).on("scroll ready", function() {
      var $content, $header, deltaHeight, headerStartingHeight, height, minHeight, opacity, threshold;
      $header = $('header');
      $content = $('header h1');
      headerStartingHeight = $header.data('starting-height');
      minHeight = $header.data('min-height');
      deltaHeight = headerStartingHeight - this.scrollY;
      threshold = headerStartingHeight - minHeight;
      height = this.scrollY > threshold ? minHeight : deltaHeight;
      $header.css('height', height);
      opacity = this.scrollY > threshold ? 0 : 1 - this.scrollY / minHeight;
      return $content.css('opacity', opacity);
    });
  })($);

}).call(this);
