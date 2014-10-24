---
title: Tips for I18n-js, Ember, and Ember Validations
date: 2014-08-05 23:57 UTC
tags: 
- ember.js 
- i18n-js
- ember-validations
author: Chris Zhang
---

Ember's handlebars helpers don't like having too many arguments (it allows you to have one argument and an options hash) and doesn't like nested calls (you can't pass the result of a helper into another helper). We have a helper method for i18n-js that allows us to translate things in the view layer.

So to make the helper method handle string interpolation with nested translations (for example: translating "If you want to learn more, click #{here}", and then `here` is itself a translated link to somewhere), we make the translate helper recognize as special suffix (`Key`) and translate the key before passing it in for string interpolation in the original key.

The final method looks like this:

<a class="jsbin-embed" href="http://emberjs.jsbin.com/ricimiciwe/1/">Ember Translate Helper Method</a>


We also had some trouble using the message field in ember-validations, as it overwrites i18n and appeared to be setting the message value before we set our i18n-js locale, causing all our error messages to be stuck in english.

We fixed it by changing the message from trying to translate the string to just returning the translation key and changing the view accordingly to handle the translation there instead.

<a class="jsbin-embed" href="http://emberjs.jsbin.com/zagapajisi/1/">Sample Validations</a>

