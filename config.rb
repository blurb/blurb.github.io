###
# Compass
###

# Change Compass configuration
compass_config do |config|
  config.add_import_path "bower_components/foundation/scss"
  #config.output_style = :compact
end

# Add bower's directory to sprockets asset path
after_configuration do
  @bower_config = JSON.parse(IO.read("#{root}/.bowerrc"))
  sprockets.append_path File.join "#{root}", @bower_config["directory"]
end

# Prevent HAML from messing with code blocks.
set :haml, :ugly => true

# configure the blog
activate :blog do |blog|
  blog.layout = "blog"
end

# Use middleman-syntax for Github-style code blocks.
activate :syntax, :line_numbers => true
set :markdown_engine, :redcarpet
set :markdown,
  :fenced_code_blocks => true,
  :smartypants => true

###
# Page options, layouts, aliases and proxies
###

# Per-page layout changes:
#
# With no layout
# page "/path/to/file.html", :layout => false
#
# With alternative layout
# page "/path/to/file.html", :layout => :otherlayout
#
# A path which all have the same layout
# with_layout :admin do
#   page "/admin/*"
# end

# Proxy pages (http://middlemanapp.com/basics/dynamic-pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", :locals => {
#  :which_fake_page => "Rendering a fake page with a local variable" }

###
# Helpers
###

# Automatic image dimensions on image_tag helper
# activate :automatic_image_sizes

# Reload the browser automatically whenever files change
activate :livereload

# Methods defined in the helpers block are available in templates
# helpers do
#   def some_helper
#     "Helping"
#   end
# end

set :css_dir, 'stylesheets'

set :js_dir, 'javascripts'

set :images_dir, 'images'

# Build-specific configuration
configure :build do
  # For example, change the Compass output style for deployment
  # activate :minify_css

  # Minify Javascript on build
  # activate :minify_javascript

  # Enable cache buster
  # activate :asset_hash

  # Use relative URLs
  activate :relative_assets

  # Or use a different image path
  # set :http_prefix, "/Content/images/"
end

activate :deploy do |deploy|
  deploy.method = :git
  deploy.strategy = :force_push      # commit strategy: can be :force_push or :submodule, default: :force_push
  deploy.build_before = true

  case ENV['TARGET'].to_s.downcase
  when "production"
    # Optional Settings
    deploy.remote   = "github"
    deploy.branch   = "master" # default: gh-pages
  else
    deploy.remote   = "origin" # remote name or git url, default: origin
    deploy.branch   = "gh-pages" # default: gh-pages
  end
end

# Redirect /blog/* to /*
activate :alias

