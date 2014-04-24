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

To sort an Ember `ArrayController` you may have used the included
SortableMixin `sortProperties` and `sortAscending` properties. These
are great and work really well for sorting on one property or sorting on
multiple properties all in the *same direction*. But that's a huge caveat,
`SortableMixin` does not allow you to sort by multiple properties in different
directions.

For example, suppose you have a list of books you want to display, with the
most recent at the top. Using the `SortableMixin`, this is done by setting
`sortProperties` and `sortAscending`, and then referencing the `arrangedContent`
property in our template or view:

<a class="jsbin-embed" href="http://emberjs.jsbin.com/nibiq/latest/embed?js">Ember Starter Kit</a>

While `sortProperties` lets us specify more than property, you'll notice
`sortAscending` is a boolean value and gets applied to *all* properties.
But what if we wanted to sort by the publish date first in descending order,
then by title in ascending order? We're unable to sort in different directions without applying a custom
sort function (which can get cumbersome).

## Welcome `Ember.computed.sort`

The Computed Property Macros have several methods for creating common types
of computed properties. `Ember.computed.sort` allows us to:

* Sort properties by different criteria
* Use a custom comparison function when needed
* Sort by computed properties

`Ember.computed.sort`  has two parameters:

1. `dependentKey`: a reference to the content we're sorting
2. `sortDefinition`: either the a string referencing the property key containing the sort definition or a custom sort function

In the example below, `sortDefinition` is the property key `propertiesToSortBy`,
which is an array of property keys and the corresponding sort direction. By
default, properties are sorted in ascending order, but by appending ":desc" to the
key we can change the sort direction. This allows to specify a different
sort direction for each property:

<a class="jsbin-embed" href="http://emberjs.jsbin.com/fidiy/latest/embed?js">Ember Starter Kit</a>

Your template or view will need to reference `sortedBooks` to reflect the
sorted content. [See the complete JS Bin example](http://emberjs.jsbin.com/fidiy/6/edit?html,js,output).

Don't forget to check out the slides below for links to more examples.

## Ember.js NYC Meetup Presentation

<iframe width="576" height="331" src="//www.youtube.com/embed/dWIJ5Wk3LG4" frameborder="0" allowfullscreen></iframe>

<iframe src="//slides.com/estellagonzalezmadison/deck/embed" width="576" height="420" scrolling="no" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

<script src="http://static.jsbin.com/js/embed.js"></script>