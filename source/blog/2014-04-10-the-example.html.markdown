---
title: The example
date: 2014-04-10 17:13 UTC
description: Our Rails 3 upgrade stuff
tags: ruby, rails
---

## Upgrade to Rails 2.3.10
Rails 2.3.10 is a Rails 2.3 release with some Rails 3 deprecation warnings and Rails 3 style XSS support turned on.  It will be a good interim step in migrating to Rails 3.

* move vendored plugins to gem
** We have a bunch of plugins that are unpacked into vendor/plugins, remove these and replace them with gems in the Gemfile
* remove/find alternatives to incompatible plugins
** the big one here is ActionWebService.  I haven't found a version that works on 2.3.10, much less Rails 3.  We would have to rewrite Blurby -> Bookserve communication to remove this
** acts_as_paranoid also doesn't work.  It monkey patches ActiveRecord in ways that are not compatible with 2.3.10.  Modifying it to work with 2.3.10 shouldn't be too hard, but Rails 3 would be very difficult.  Maybe find an alternative?
* use Rails internationalization (this has already been started)
* verify all views - Rails 2.3.10 defaults to sanitizing all string in views.  This is the opposite behavior of 2.3.2.

## Upgrade to Rails 3
* migrate to Bundler (done)
* upgrade routes to Rails 3 syntax
* ???

Rails 2.3.10
Rails 2.3.10 is a Rails 2.3 release with some Rails 3 deprecation warnings and Rails 3 style XSS support turned on.  It will be a good interim step in migrating to Rails 3.

* move vendored plugins to gem
** We have a bunch of plugins that are unpacked into vendor/plugins, remove these and replace them with gems in the Gemfile
* remove/find alternatives to incompatible plugins
** the big one here is ActionWebService.  I haven't found a version that works on 2.3.10, much less Rails 3.  We would have to rewrite Blurby -> Bookserve communication to remove this
** acts_as_paranoid also doesn't work.  It monkey patches ActiveRecord in ways that are not compatible with 2.3.10.  Modifying it to work with 2.3.10 shouldn't be too hard, but Rails 3 would be very difficult.  Maybe find an alternative?
* use Rails internationalization (this has already been started)
* verify all views - Rails 2.3.10 defaults to sanitizing all string in views.  This is the opposite behavior of 2.3.2.

## Upgrade to Rails 3
* migrate to Bundler (done)
* upgrade routes to Rails 3 syntax
* ???

Rails 2.3.10
Rails 2.3.10 is a Rails 2.3 release with some Rails 3 deprecation warnings and Rails 3 style XSS support turned on.  It will be a good interim step in migrating to Rails 3.

* move vendored plugins to gem
** We have a bunch of plugins that are unpacked into vendor/plugins, remove these and replace them with gems in the Gemfile
* remove/find alternatives to incompatible plugins
** the big one here is ActionWebService.  I haven't found a version that works on 2.3.10, much less Rails 3.  We would have to rewrite Blurby -> Bookserve communication to remove this
** acts_as_paranoid also doesn't work.  It monkey patches ActiveRecord in ways that are not compatible with 2.3.10.  Modifying it to work with 2.3.10 shouldn't be too hard, but Rails 3 would be very difficult.  Maybe find an alternative?
* use Rails internationalization (this has already been started)
* verify all views - Rails 2.3.10 defaults to sanitizing all string in views.  This is the opposite behavior of 2.3.2.

## Upgrade to Rails 3
* migrate to Bundler (done)
* upgrade routes to Rails 3 syntax
* ???
