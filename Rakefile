namespace :deploy do
  desc "Build and deploy by pushing to staging."
  task :staging do
    FileUtils.rm_rf "build"
    system "bundle exec middleman deploy"
  end

  desc "Build and deploy by pushing to production."
  task :production do
    FileUtils.rm_rf "build"
    system "TARGET=production bundle exec middleman deploy"
  end
end
