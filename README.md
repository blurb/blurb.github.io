Blurb Engineering & Github
--------------------------

Blurb Engineering blog, hosted by Github.com.

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
    
This should output something like

    == The Middleman is loading
    == LiveReload is waiting for a browser to connect
    == The Middleman is standing watch at http://0.0.0.0:4567
    == Inspect your site configuration at http://0.0.0.0:4567/__middleman/
    
You can go to that address to view a sitemap, then browse to the page you're editing to view it in your browser.

## Posting

    $ middleman article "Some title"

Open the file just mentioned, write it up, add a tag or two, save and commit.

Note that you can provide the following options in the YAML front matter
in your article:

* `twitter_username`: Your twitter handle, minus the `@`
* `author_url`: A link to your personal site, should you include it.
* `github_username`: Your github.com handle.

## Deploying

### To staging (http://git.blurb.com/pages/blurb/blurb.github.io)

    $ bundle exec rake deploy:staging

### To production (http://blurb.github.io)

    $ bundle exec rake deploy:production

