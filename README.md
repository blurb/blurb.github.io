Blurb Engineering & Github
--------------------------

An experiment in using Github to be Blurb Engineering's Internet
presence.

## Middleman

[Middleman](http://middlemanapp.com/) is the Ruby static site generator framework we use to get this
site running. To install:

    $ bundle install

## Node and Bower

We then need to install Node and Bower to manage our dependencies on
third party JS and SCSS libraries:

    $ brew install nodejs
    $ npm config set prefix /usr/local # so npm packages can be found
    $ npm install -g bower bower-cli

Now initialize Bower, which will grab third party extensions and
libraries like jQuery and ZURB Foundation:

    $ bower install

## Setting up staging and production git remotes

We use git@git.blurb.com as the staging server, and git@github.com as
the production deploy server.

Add "github" as the github remote:

    $ git remote add github git@github.com:blurb/blurb.github.io

## Starting in development

Now you're ready to boot up the site. Middleman provides a runner to run
a temporary server:

    $ middleman

## Posting

    $ middleman article "Some title"

Open the file just mentioned, write it up, add a tag or two, save and commit.

## Deploying

### To staging (http://git.blurb.com/pages/blurb/blurb.github.io)

    $ middleman deploy

### To production (http://blurb.github.io)

    $ TARGET=production middleman deploy

