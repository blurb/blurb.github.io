---
title: Ember Data Sideloading for Objects with Nonstandard Primary Keys
date: 2014-06-23 19:03 UTC
tags: ember.js ember-data sideloading
author: Chris Zhang
---

This builds off the sideloading ApplicationSerializer introduced in [this article](http://mozmonkey.com/2013/12/loading-json-with-embedded-records-into-ember-data-1-0-0-beta/) and adapts it to handle JSON objects that don't have "id" as their primary key.

Let's start with data that looks like:

    {
      "photobook": {
        prices: [
          {cents: 2000,
           currency: {
             iso_id: "USD",
             symbol: "$",
             delimiter: ","
           }
          },
          {cents: 1600,
           currency: {
             iso_id: "EUR",
             symbol: "€",
             delimiter: ","
           }
        ],
      },
      "textbook": {
        prices: [
          {cents: 1000,
           currency: {
             iso_id: "USD",
             symbol: "$",
             delimiter: ","
           }
          },
          {cents: 800,
           currency: {
             iso_id: "EUR",
             symbol: "€",
             delimiter: ","
           }
          }
        ],
      }
    }

If we import this using the previously defined sideloading serializer, we end up with four currencies, each with a generated id, which can quickly start to clutter our store when we start handling dozens or hundreds of prices in multiple different currencies

In order to fix this, we need to look at the sideloadItem method. 

    sideloadItem: (payload, type, item, parentType, parentId) ->
        #if the item is already a number, it has already been sideloaded
        return unless isNaN(item)
    
        sideloadKey = type.typeKey.pluralize() # The key for the sideload array
        sideloadArr = payload[sideloadKey] or [] # The sideload array for this item
        primaryKey = Ember.get(this, "primaryKey") # the key to this record's ID
        id = item[primaryKey]

        # Missing an ID, generate one
        if typeof id is "undefined"
          id = "generated-" + (++@_generatedIds)
          item[primaryKey] = id
      
      
primaryKey in this case is always set to "id", because "this" in our case refers to the ApplicationSerializer rather than the serializer for "item". Ember Data always needs an id for its records, so what we can do instead of letting each currency generate a new one is set the id here based on some other primary key.

At this point, "type" is the class of the item (App.Currency) and item is the payload of the json, which should look something like this (note that it hasn't been run through the serializer for its class yet):

    {  iso_id: "USD",
       symbol: "$",
       delimiter: "," }

So what we can do is shove an id into the item before pushing it into the sideload array, by checking to see if the class has a nonstandard primary key that we want to store as the id of the item.

    sideloadItem: (payload, type, item, parentType, parentId) ->
      #if the item is already a number, it has already been sideloaded
      return unless isNaN(item)
  
      sideloadKey = type.typeKey.pluralize() # The key for the sideload array
      sideloadArr = payload[sideloadKey] or [] # The sideload array for this item

      # Item has a nonstandard primary key, so add it as the id field,
      # to prevent duplicates in the store.
      if type.rawPrimaryKey
        item.id = item[type.rawPrimaryKey]
  
      id = item.id

      # Missing an ID, generate one
      if typeof id is "undefined"
        id = "generated-" + (++@_generatedIds)
        item.id = id
    
      # Add backwards link to parent if relationship exists
      type.eachRelationship ((key, relationship) ->
        if relationship.type == parentType
          if relationship.kind is "belongsTo"
            item[key] = parentId unless item[key]
          else if relationship.kind is "hasMany"
            unless (item[key] and (parentId in item[key]))
              item[key] = item[key] or []
              item[key].push(parentId)
        ), this
  
      # Don't add if already side loaded
      return payload  unless sideloadArr.findBy("id", id) is `undefined`

      # Add to sideloaded array
      sideloadArr.push item
      payload[sideloadKey] = sideloadArr
      payload
  
And to set the rawPrimaryKey (raw because we want the key the json gives us, because we haven't yet normalized it to the class's actual ) as a class attribute, we need to reopen the it, as so:

    App.Currency.reopenClass({
      rawPrimaryKey: "iso_id"
    })

Now, loading the data gives us four prices and two currencies, with the added bonus that prices with the same currency should not return true for price.currency == price2.currency.

The final file looks like:

    ET.ApplicationSerializer = DS.RESTSerializer.extend(
      ###
      Reformat root key to snake_case
      ###
      serializeIntoHash: (data, type, record, options) ->
        root = Ember.String.decamelize(type.typeKey)
        data[root] = @serialize(record, options)

      ###
      The current ID index of generated IDs
      @property
      @private
      ###
      _generatedIds: 0
      ###
      Sideload a JSON object to the payload
      @method sideloadItem
      @param {Object} payload   JSON object representing the payload
      @param {subclass of DS.Model} type   The DS.Model class of the item to be sideloaded
      @param {Object} item JSON object   representing the record to sideload to the payload
      ###
      sideloadItem: (payload, type, item, parentType, parentId) ->
        #if the item is already a number, it has already been sideloaded
        return unless isNaN(item)
    
        sideloadKey = type.typeKey.pluralize() # The key for the sideload array
        sideloadArr = payload[sideloadKey] or [] # The sideload array for this item

        # Item has a nonstandard primary key, so add it as the id field,
        # to prevent duplicates in the store.
        if type.rawPrimaryKey
          item.id = item[type.rawPrimaryKey]
    
        id = item.id

        # Missing an ID, generate one
        if typeof id is "undefined"
          id = "generated-" + (++@_generatedIds)
          item.id = id
      
        # Add backwards link to parent if relationship exists
        type.eachRelationship ((key, relationship) ->
          if relationship.type == parentType
            if relationship.kind is "belongsTo"
              item[key] = parentId unless item[key]
            else if relationship.kind is "hasMany"
              unless (item[key] and (parentId in item[key]))
                item[key] = item[key] or []
                item[key].push(parentId)
          ), this
    
        # Don't add if already side loaded
        return payload  unless sideloadArr.findBy("id", id) is `undefined`

        # Add to sideloaded array
        sideloadArr.push item
        payload[sideloadKey] = sideloadArr
        payload

      # Returns a related item if it exists
      # @param {Object} recordJSON   JSON object representing the current record in the payload to look for relationships
      # @param {String} key          String that represents a potential relationship. This can be camelcase or snake case
      _relatedItem: (recordJSON, key) ->
        record = recordJSON[Ember.String.decamelize(key)]
        if record then record else recordJSON[key]

      ###
      Extract relationships from the payload and sideload them. This function recursively
      walks down the JSON tree

      @method sideloadItem
      @param {Object} payload   JSON object representing the payload
      @param {Object} recordJSON   JSON object representing the current record in the payload to look for relationships
      @param {Object} recordType   The DS.Model class of the record object
      ###
      extractRelationships: (payload, recordJSON, recordType) ->
        @_camelCasePayload(recordJSON)

        # Loop through each relationship in this record type
        recordType.eachRelationship ((key, relationship) ->
          related = @_relatedItem(recordJSON, key) # The record at this relationship
          type = relationship.type # belongsTo or hasMany
          if related and isNaN(related)

            # One-to-one
            if relationship.kind is "belongsTo"

              # Sideload the object to the payload
              @sideloadItem payload, type, related, recordType, recordJSON['id']

              # Replace object with ID
              recordJSON[key] = related.id

              # Find relationships in this record
              @extractRelationships payload, related, type

            # Many
            else if relationship.kind is "hasMany"

              # Loop through each object
              related.forEach ((item, index) ->

                # Sideload the object to the payload
                @sideloadItem payload, type, item, recordType, recordJSON['id']

                # Replace object with ID
                related[index] = item.id

                # Find relationships in this record
                @extractRelationships payload, item, type
                return
              ), this
          return
        ), this
        payload

      # this modifies the given payload and camelcases the payload keys
      _camelCasePayload: (payload) ->
        for own key, value of payload
          camelKey = Ember.String.camelize(key)
          if camelKey isnt key
            payload[camelKey] = value
            delete payload[key]

      ###
      Overrided method
      ###
      normalizePayload: (type, payload) ->
        @_camelCasePayload(payload)
        payload = @_super(type, payload)

        # when using @store.pushPayload, there is no type
        return payload unless type

        typeKey = type.typeKey
        typeKeyPlural = typeKey.pluralize()

        # Many items (findMany, findAll)
        unless typeof payload[typeKeyPlural] is "undefined"
          payload[typeKeyPlural].forEach ((item, index) ->
            @extractRelationships payload, item, type
            return
          ), this

        # Single item (find)
        else
          @extractRelationships payload, payload[typeKey], type  unless typeof payload[typeKey] is "undefined"
        payload

      typeForRoot: (root) ->
        camelized = Ember.String.camelize(root)
        Ember.String.singularize(camelized)
    )


