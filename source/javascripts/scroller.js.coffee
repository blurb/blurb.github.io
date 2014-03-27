do (jQuery=$) ->
  $(window).on "scroll", ->
  	console.log @scrollY
  	$header = $('header')
  	headerHeight = $header.height()
  	headerStartingHeight = $header.data('starting-height')
  	minHeight = $header.data('min-height')

  	deltaHeight = headerStartingHeight - @scrollY

  	height = if (@scrollY > deltaHeight) then minHeight else deltaHeight
  	$header.css('height', height)
