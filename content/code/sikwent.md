+++
title = "Sikwent"
description = "An experiment in sequencing"
date = 2024-03-13

[taxonomies]
technologies = ["JavaScript", "Vite", "Solid"]
categories = ["Work in Progress"]

[extra]
repo = "https://github.com/spitlo/sikwent"
first_commit_time = 2024-03-03
first_commit_message = "The beginning is simple to mark"
+++

Sikwent (actually `/'siːkwənt/` but my fonts don’t have all the needed glyphs) is an experiment in sequencing. The idea is that every new track that is added have one more "tick" than the one before. Ticks are sixteenth notes.

Sikwent is available online at [spitlo.com/sikwent/](https://spitlo.com/sikwent/).

Sikwent also has a sibling of sorts, [Space](/code/space/), available online at [spitlo.com/space/](https://spitlo.com/space/).

You start with a single track with a single tick (checkbox). To add a track, you must first activate a tick in the current one. As soon as you do, a new track becomes available. Deactivating every tick in a higher track won’t delete the channels below.

You can mute individual tracks by using keys `a` to `z` on your keyboard. Or by clicking/tapping the track name.
