---
title: Sorting Ember ArrayController
date: 2014-04-23 20:01 UTC
tags: ember.js
author: Estella Madison
author_url: https://twitter.com/chicagoing
---

> Last April, I presented at the [Ember NYC meetup](https://twitter.com/EmberNYC)
> to discuss different approaches for sorting an ArrayController. This is a
> short synopsis, you can learn more in the meetup video and slides.

To sort an Ember ArrayController you may have used the included
SortableMixin `sortProperties` and `sortAscending` properties. These
are great and work really well for sorting on one property or sorting on
multiple properties all in the *same direction*. But that's a huge caveat,
SortableMixin does not allow you to sort by multiple properties in different
directions.

## Welcome `Ember.computed.sort`

The Computed Property Macros have several methods for creating common types
of computed properties. `Ember.computed.sort` allows us to:

* Sort properties by different criteria
* Use a custom comparison function when needed
* Sort by computed properties

## Ember.js NYC Meetup Presentation

<iframe width="576" height="331" src="//www.youtube.com/embed/dWIJ5Wk3LG4" frameborder="0" allowfullscreen></iframe>

<iframe src="//slides.com/estellagonzalezmadison/deck/embed" width="576" height="420" scrolling="no" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
