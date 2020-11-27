+++
title = "Zola Deploy"
description = "Deploy Zola from GitHub (fork)"
date = 2020-11-26

[taxonomies]
technologies = ["Docker", "Shell"]

[extra]
repo = "https://github.com/spitlo/zola-deploy-action"
+++

I prefer to keep my GitHub Pages files in a `docs` folder, and not in a separate branch.

Both available actions for Zola deploys in the marketplace used the branch method, so I forked the simplest of them and made it even simpler.

This action could be used on `push` for automatic deploys, but I use with the event `workflow_dispatch` to be able to trigger a deploy from inside GitHub.
