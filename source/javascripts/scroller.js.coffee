do (jQuery=$) ->
  $(window).on "scroll ready", ->
  	console.log @scrollY
  	$header = $('header')
  	$content = $('header h1')
  	headerHeight = $header.height()
  	headerStartingHeight = $header.data('starting-height')
  	minHeight = $header.data('min-height')

  	deltaHeight = headerStartingHeight - @scrollY

  	height = if (@scrollY > deltaHeight) then minHeight else deltaHeight
  	$header.css('height', height)

  	opacity = if (@scrollY > deltaHeight) then 0 else 1 - @scrollY / deltaHeight;
  	$content.css('opacity', opacity)