do (jQuery=$) ->
  $(window).on "scroll ready", ->
  	$header = $('header')
  	$content = $('header h1')
  	headerStartingHeight = $header.data('starting-height')
  	minHeight = $header.data('min-height')

  	deltaHeight = headerStartingHeight - @scrollY
  	threshold = headerStartingHeight - minHeight

  	height = if (@scrollY > threshold) then minHeight else deltaHeight
  	$header.css('height', height)

  	opacity = if (@scrollY > threshold) then 0 else 1 - @scrollY / minHeight;
  	$content.css('opacity', opacity)