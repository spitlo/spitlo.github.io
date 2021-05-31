+++
title = "Changelog"

[extra]
no_meta = true
content_class = "changelogPage"
+++

This is the human-readable, curated changelog. For a full (automated) changelog, visit [the repo](https://github.com/spitlo/spitlo.github.io/blob/master/CHANGELOG.md).

## v1.11.x _(2021-05-28)_

- Added dark mode, enabled if user’s system is in dark mode (~~no toggle~~)
- Added `:ajour` command (beta) to open <https://spitlo.com/ajour/> in an iframe. The iframe takes up the same space as the `<main>` tag, so it works best on shorter pages (no double scrolling)
- Added `:dark` and `:light` commands to force set a theme, with option to save choice in a cookie.

## v1.10.x _(2021-05-13)_

- Added a microgame, 'Lenny’s E-game Emporium', as [game menu](/games/)
- Font loading improvements
- Added this changelog

## v1.9.x _(2021-05-09)_

- Added a JavaScript only [game section](/games/), primarily reachable through the command `:games`
- Added support for [text-engine](https://github.com/okaybenji/text-engine), a text adventure game engine by
Benji Kay and [Kontra](https://github.com/straker/kontra), a gaming micro-library by Steven Lambert
- Started on a game, [Oxygen Chase](/games/oxygen-chase/), a tiny text-adventure

## v1.8.x - v1.7.x _(2021-05-02)_

- Changed this-day-in-time link to point to Wikipedia
- Added a few more introductions on start page, these are randomized on each build
- Bug fixes
- Styling fixes

## v1.6.x _(2021-05-02)_

- Moved to using ES6 modules
- JavaScript improvements

## v1.5.x - v1.3.x _(2021-04-30)_

- Added scrambling for contact information, and a command to unscramble
- Search improvements, enable search on mobile
- Improved dotmatrix mode
- Minify JavaScript on deploy using [`JSMin`](https://www.crockford.com/jsmin.html)

## v1.2.x _(2021-04-30)_

- Implemented Spitlo.com Corporate Overlord Protection for less helpful sharing of articles on social media

## v1.1.x _(2021-04-29)_

- Added an article pager (prev/next links in article footer)

## v1.0.x _(2021-04-29)_

- Public release
