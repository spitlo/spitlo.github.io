+++
title = "Firetrak"
description = "Develop locally with real https certificates using Traefik and Let’s Encrypt"
date = 2020-11-01

[taxonomies]
technologies = ["Shell", "Let’s Encrypt"]

[extra]
repo = "https://github.com/spitlo/firetrak"
+++

Firetrak is used to develop locally with real https certificates using [Traefik](https://traefik.io) and [Let’s Encrypt](https://letsencrypt.org/).

When running Gatsby/Next/Django/node projects (and other projects that expose a single port we can reverse proxy to) you won’t need Docker/Pilothouse/Nginx or whatever you currently use to serve https locally. Also, you won’t need to add entries to your `hosts` file.

At the moment, Firetrak supports domains managed by Digitalocean, but it should be pretty easy to extend it to work with any of the Traefik’s [supported providers](https://doc.traefik.io/traefik/https/acme/#providers).

## Rationale

A lot of my projects at `$WORK` demand that we use https in development. In 2017 I got a [feature request](https://github.com/Pilothouse-App/Pilothouse/issues/93) implemented in [Pilothouse](https://www.pilothouse-app.org/) that allows for using it as a reverse proxy for local projects, and we have used it with success since. But Pilothouse is mostly made for PHP development, depends on Docker, and downloads a bunch of containers to enable multiple versions of PHP. That’s ok on my work computer, but my laptop struggles with it. Also, Covid means more development done on the laptop, and since we don’t do much WordPress development anymore anyway, I felt it was time to look for a more lightweight solution. Hopefully, Firetrak is that.

## Installation

See [the repo](https://github.com/spitlo/firetrak) for up-to-date install instructions.
