+++
title = "Zola Deploy"
description = "Deploy Zola from GitHub (fork)"
date = 2020-11-26

[taxonomies]
technologies = ["Docker", "Shell"]

[extra]
repo = "https://github.com/spitlo/zola-deploy-action"
first_commit = 2020-11-26
+++

I prefer to keep my GitHub Pages files in a `docs` folder, and not in a separate branch.

But both available actions for Zola deploys in the marketplace uses the `gh-pages` (branch) method, so I forked the simplest of them and made it even simpler. Than I made it a bit less simple.

This action could be used on `push` for automatic deploys, but I use it with the event `workflow_dispatch` to be able to trigger a deploy manually from inside GitHub.

It runs `zola check` before building. If you supply a `SITE_URL` variable, it will try to shrink the search index file by replacing all instances of `$SITE_URL` with empty space.
