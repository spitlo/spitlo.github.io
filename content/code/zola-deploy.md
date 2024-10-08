+++
title = "Zola Deploy"
description = "Deploy Zola from Github (fork)"
date = 2020-11-26

[taxonomies]
technologies = ["Docker", "Bash", "GitHub Actions"]

[extra]
repo = "https://github.com/spitlo/zola-deploy-action"
first_commit_time = 2020-11-26
first_commit_message = "Unclear (Forked repo)"
+++

I prefer to keep my Github Pages files in a `docs` folder, and not in a separate branch.

But both available actions for Zola deploys in the marketplace uses the `gh-pages` (branch) method, so I forked the simplest of them and made it even simpler. Than I made it a bit less simple.

This action could be used on `push` for automatic deploys, but I use it with the event `workflow_dispatch` to be able to trigger a deploy manually from inside Github.

It runs `zola check` before building. If you supply a `SITE_URL` variable, it will try to shrink the search index file by replacing all instances of `$SITE_URL` with empty space.
