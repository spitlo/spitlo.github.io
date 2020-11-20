+++
title = "Spoons"
description = "My Hammerspoon config with some custom Spoons"
date = 2020-02-12

[taxonomies]
technologies = ["Lua"]

[extra]
repo = "https://github.com/spitlo/hammerspoon"
+++

I use [Hammerspoon](https://www.hammerspoon.org/) together with [Karabiner-Elements](https://karabiner-elements.pqrs.org/) on macOS to set up keyboard shortcuts and window management.

This repo contains a mix of some of the official Spoons and some of my own or customized Spoons, along with my Hammerspoon config.

The WinWin Spoon included is customized to add a method, `smartStepResize`, that resizes the focused window "smartly" by one step.

Smartly in this context means:

- If window gravitates to the left, `right` and `left` expands and shrinks the window on the right border (see illustration).
- If window is more to the right, it resizes on the left border.
- The same principal applies to `up` and `down`.
- When a window is full width or full height, it will shrink/expand in the 'direction' direction.

```text
 +------------------+------------------+
 |   +-------------------+             |
 |   |              |    |             |
 |   |              |  < | >           |
 +-------------------------------------+
 |   |         /\   |    |             |
 |   +-------------------+             |
 |             \/   |                  |
 +------------------+------------------+
```
