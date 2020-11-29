+++
title = "Shopify Labels"
description = "Make printable address labels for Shopify orders"
date = 2020-06-25

[taxonomies]
technologies = ["TypeScript", "HTML5", "Sass", "Shell"]

[extra]
repo = "https://github.com/spitlo/shopify-labels"
+++

This is a very basic app for loading a CSV file of orders exported from Shopify, and generating pages suitable for printing address labels.

At the moment it’s mostly hardcoded to suit my needs, which are three column A4 pages with eleven rows of labels for shipping inside Sweden. The amount of colmuns and rows can be changed, but it’s not tested. I might make it more customizable in the future, especially since print CSS is quirky and label printing needs some precision/fiddling.

No files are sent to the server, this is just a one page HTML/JavaScript app.

It’s available online at <https://spitlo.com/shopify-labels/>
