---
title: Ember Data Sideloading for Objects with Nonstandard Primary Keys
date: 2014-06-23 19:03 UTC
tags: 
- ember.js 
- ember-data 
- sideloading
author: Chris Zhang
---

This builds off the sideloading `ApplicationSerializer` introduced in [this article](http://mozmonkey.com/2013/12/loading-json-with-embedded-records-into-ember-data-1-0-0-beta/) and adapts it to handle JSON objects that don't have "id" as their primary key. Several instances where this might come up are when handling currencies or countries.

Let's start with data that looks like:

<a class="jsbin-embed" href="http://emberjs.jsbin.com/majone/3/embed?js">Sample Data</a>

If we import this using the previously defined sideloading serializer, we end up with four currencies, each with a generated id, which can quickly start to clutter our store when we start handling dozens or hundreds of prices in multiple different currencies.

In order to fix this, we need to look at the `sideloadItem` method. 


<a class="jsbin-embed" href="http://emberjs.jsbin.com/jises/6/embed?js#J:L14-20">Original</a>
      
`primaryKey` in this case is always set to "id", because `this` in our case refers to the `ApplicationSerializer` rather than the serializer for `item`. Ember Data always needs an id for its records, so what we can do instead of letting each currency generate a new one is set the id here based on some other primary key.

At this point, `type` is the class of the item (`App.Currency`) and `item` is the payload of the json, which should look something like this (note that it hasn't been run through the serializer for its class yet):

    {  iso_id: "USD", symbol: "$", delimiter: "," }

So what we can do is shove an id into the item before pushing it into the sideload array, by checking to see if the class has a nonstandard primary key that we want to store as the id of the item.

<a class="jsbin-embed" href="http://emberjs.jsbin.com/jises/5/embed?js#J:L17-20">new</a>
  
And to set the `rawPrimaryKey` (raw because we want the key the json gives us, because we haven't yet normalized it to the class's actual ) as a class attribute, we need to reopen the it, as so:

    App.Currency.reopenClass({
  rawPrimaryKey: "iso_id"
})

Now, loading the data gives us four prices and two currencies, with the added bonus that comparing the currencies of two prices with the same currency should now work as expected without needing a custom compare method.

The final file looks like:

<a class="jsbin-embed" href="http://emberjs.jsbin.com/jises/8/embed?js">Final</a>

<script src="http://static.jsbin.com/js/embed.js"></script>
