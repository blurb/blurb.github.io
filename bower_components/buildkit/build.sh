#!/bin/bash
git checkout master && \
wget http://jenkins/job/Buildkit-Artifact/lastSuccessfulBuild/artifact/build/buildkit-dist.tgz && \
rm -Rf dist && \
tar xvf buildkit-dist.tgz && \
rm buildkit-dist.tgz && \
git add dist && \
git commit dist -m "Publishing buildkit at $(date)." && \
git push origin master
