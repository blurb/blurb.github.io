define(['jquery', 'underscore', 'backbone'], function($, _, Backbone) {

  /*
    View module to handle breakpoint detection
    @TODO:
      Make this configurable in the future
  */

  /*
    Example usage:

      console.log(Breakpoints.breakpoint);

      Breakpoints.on('change', function(size) {
        console.log(size);
      });
    
  */

  var Breakpoints = function() {
    this.initialize.apply(this, arguments);
  };

  _.extend(Breakpoints.prototype, Backbone.Events,  {

    breakpoint: 'lg',
    breakpointSizes : { // use the index to dynamically create these. 
      '1px':'sm',
      '2px':'md', 
      '3px':'lg' 
    },

    /*
      Breakpoint configuration to match media queries
      in css.
    */
    breakpointMediaQueries : {
      'sm':'max-width: 749px',
      'md':'min-width: 750px',
      'lg':'min-width: 960px'
    },

    elementClass: 'breaker-1232',
    element: null,


    initialize: function() {
      this.initBreakpointTracking();
    },

    initBreakpointTracking: function(klass) {
      this.setElementByClass(klass);
      this.initEvents();
      this.updateBreakpointSize();
    },

    initEvents: function() {
      var resize = _.bind(
        _.throttle(function() {
          var elementSize = this.getSizeByElement();
          if(elementSize != this.breakpoint) {
            this.updateBreakpointSize();
          }
        }, 200)
      , this);

      $(window).resize(resize);
    },

    setElementByClass: function(klass) {
      this.elementClass = klass || this.elementClass;
      if($('.' + this.elementClass).length) {
        this.element = $('.' + this.elementClass);
      } else {
        this.element = $('<div class="' + this.elementClass + '"/>');
        $('body').append(this.element);
        
        var bps = Object.getOwnPropertyNames(this.breakpointMediaQueries);
        
        // Create the styleblock in head
        var styleblock = '<!-- breakpoint.js styles -->\n';
        styleblock += '<style>';
        
        for(var size in bps)
        {
          styleblock += '@media (' + this.breakpointMediaQueries[bps[size]] + '){';
          styleblock += '.' + this.elementClass + ' {';
          styleblock += 'font-size: ' + this.getBreakpointSize(bps[size]) + ';}';
          styleblock += '}';
        }
        styleblock += '}</style>';

        $('head').append(styleblock);
      }
    },

    getBreakpointSize: function(size)
    {
      var sizes = Object.getOwnPropertyNames(this.breakpointSizes);
      for(var bp in sizes)
      {
        if (size == this.breakpointSizes[sizes[bp]])
        {
          return sizes[bp];
        }
      }
    },

    /*
      Returns the breakpoint size the test
      element is currently reporting
    */
    getSizeByElement: function() {
      return this.breakpointSizes[this.element.css('font-size')];
    },

    updateBreakpointSize: function() {
      this.breakpoint = this.getSizeByElement();
      this.trigger('change', this.breakpoint);
    }


  });

  return new Breakpoints();

});
