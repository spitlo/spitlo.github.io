+++
title = "CTGOL"
description = "Game of Life + Conway Twitty = Sequencer"
date = 2024-03-24

[taxonomies]
technologies = ["JavaScript", "Vite", "Solid"]
categories = ["Work in Progress"]

[extra]
repo = "https://github.com/spitlo/ctgol"
first_commit_time = 2024-06-09
first_commit_message = "Hello, Darlin'"
+++

Conway Twitty’s Game of Life is an experiment in sequencing. It’s an evolving step sequencer that follows the rules of Conway’s Game of Life. Each active cell will trigger a very short fragment of a Conway Twitty song.

It’s available online at [spitlo.com/ctgol/](https://spitlo.com/ctgol/).

Conway Twitty’s Game of Life is a part of a growing family of mostly useless sequencers. The family includes:
 - [PIKSEQ](/code/pikseq/), available online at [spitlo.com/pikseq/](https://spitlo.com/pikseq/)
 - [Sikwent](/code/sikwent/), available online at [spitlo.com/sikwent/](https://spitlo.com/sikwent/)
 - [Space](/code/space/), available online at [spitlo.com/space/](https://spitlo.com/space/)

## Instructions

You can start by just clicking PLAY to check out the randomized pattern. Reload or click RANDOMIZE to generate a new one.

For more advanced stuff, try picking a pattern from the dropdown. This might give you some inspiration.

If you want to experiment freely, click CLEAR to get an empty canvas. It’s a good idea to SAVE often, since a) your pattern will change while playing, and b) this is a pretty buggy sequencer :)

To help you place ticks, there are some keyboard modifiers. If you press `alt`/`option` while painting a tick, you will get a horizontal line. If you press `shift` while painting a tick, you will get a vertical line. Lines extend through all inactive ticks, so you can put a start and end tick and the line will cover the area between them. If you press `windows`/`command`/`meta` (depending on your OS) while drawing a line, the line will only paint every other tick.

You can enable kaleidoscope mode, either for the X axis, the Y axis, or both. This will mirror the ticks you paint horizontally, vertically or both.

While playing, you can mute individual tracks by using keys `a` to `z` on your keyboard. Or by clicking/tapping the track letter to the right of the track. To mute the drum loop, uncheck the box that says "Enable drum loop".

To preview what a track sounds like, click the name on the right side of the track. This will play the sound that track represents.
