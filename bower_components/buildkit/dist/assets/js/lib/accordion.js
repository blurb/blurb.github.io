define([
  'jquery',
  'underscore'
],
function($, _) {

  var P_Accordion = function(){

    this.toggle = function($el){
      $el.next().toggleClass('is-active')
      return this;
    }

  }
  
  return P_Accordion;
  
});

// var x = new P_Accordion();
// $('.el').toggle();