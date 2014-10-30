---
title: How we work.
date: 2014-10-30 00:56 UTC
tags:
- engineering
- day in the life
author: Andrew Hao
author_url: http://www.g9labs.com
twitter_username: andrewhao
github_username: andrewhao
---

#### A quick glimpse into developer life at Blurb:

I get into the office around 9AM and check email (and make my daily
coffee -- can't miss it). Great. I usually spend some time cleaning up
correspondence between some product owners and our tech leads discussing
new ideas around new product X or feature Y. A quick scan of New Relic and Airbrake reveal that the site's humming along well.

I log into [Slack](http://www.slack.com), our central communication hub,
and quickly get a dump of the conversations by our teammates in the
morning and last night. Surprisingly, something as simple as a central
chatroom has helped break down some communication walls in our teams.
Furthermore, having a continual log of team conversations have helped
our remote workers keep abreast of continual updates.

#### Agile @ Blurb

I log into JIRA and scan the board to check our team status. Looks like
we still have a lot of in-progress stories. I'm currently not assigned
anything.

At our daily standup, Chris, a senior engineer on my team, is working on
story Z. I decide I'm going to ask Chris how he's doing
and see if I can help.

Chris tells me that he needs some help writing a few tests for his
feature, so I pull up a chair and we jump right into it -- he implements
the feature, I write the tests. Time passes. We finish our work and we push
our branch up to the Github server for some code review.

#### Code reviews

Code review on our team is done via the pull request system -- we ping
our teammates on Slack and ask for a code review. The comments begin
flowing in, and we respond.

Simulataneously, we're looking at [Code
Climate](http://www.codeclimate.com) to give us feedback on how our code
fared against its static analysis tools. Hmm, we seem to have bumped
code complexity a bit in this class, so let's sit down and refactor some
more. We push a change and we ask folks in our chatroom to help give
comments once more.

![Pull requests](images/2014/10/sample_pull_request.png)

(Lunch rolls around. We grab some coworkers to stretch our legs and go to lunch at
[Senor Sisig](https://twitter.com/senorsisig), which
is probably the best food truck in the world.)

Our team works on a 2-"+1" code review system. When we make code
changes, we need at least two other people on the team to approve our
code. It sounded a little daunting at first, but it's been a good way to
make sure that the right conversations are happening around the code.

#### Robots make life better.

Our [hubot](https://github.com/github/hubot) sits in the chatroom and
tries to be a little helpful. Here, hubot chimes in and lets us know
that two people have given their approvals.

![Slack chat #dayinthelife](images/2014/10/slack_window.png)

#### Continous integration @ Blurb

We merge the pull request and wait for Jenkins to run the unit test
build. We keep a big ol' build light on a bunch of build monitors in our work
area. If you break the build, the big red light will radiate waves of
Shame upon you until you fix the build.

![Build light: green is good.](images/2014/10/build_light.jpg)

Once the build passes, it automatically deploys the app to an internal
staging environment -- the whole process happens within 15 minutes.

Sheree, a test engineer on our team, has already run ahead of us and
written some RSpec integration tests prior to our implementation. Chris
has already sat down with Sheree prior to beginning the story and
defined some of the stories and use cases, BDD-style. We work together
to get the integration tests running and working.

#### All in a day's work.

A big reason I enjoy working here is because our daily development
workflow encourages teamwork and collaboration, and you can get feedback
on your changes very quickly. And we're making it better! Stay tuned as
we continue to write more about our engineering practices.

> Andrew is an Engineering Manager on the Web Team. He has long ago
> acknowledged the superiority of Senor Sisig burritos and looks forward
> to them all week.
