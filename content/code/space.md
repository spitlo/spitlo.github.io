+++
title = "Space"
description = "A generative ambient music player"
date = 2023-01-28

[taxonomies]
technologies = ["JavaScript", "Vite"]
categories = ["Work in Progress"]

[extra]
repo = "https://github.com/spitlo/space"
first_commit_time = 2023-01-27
first_commit_message = "It was a pleasure to burn"
+++

Space is some kind of generative ambient music machine inspired by a bunch of tiling images I created using [ImaginAIry](https://github.com/brycedrennan/imaginAIry/). It’s available online at [spitlo.com/space/](https://spitlo.com/space/).

The spinning logo thing is done with [Zdog](https://github.com/metafizzy/zdog) and [Zfont](https://github.com/jaames/zfont). The "music" is generated with [Tone.js](https://github.com/Tonejs/Tone.js). Colors are extracted from the current background image using [node-vibrant](https://github.com/Vibrant-Colors/node-vibrant).

The prompt for ImaginAIry -- for anyone interested -- was "70's sci-fi landscape", the full comand was:

```bash
imagine "70's sci-fi landscape" -w 1024 -h 256 -r 100 --tile
```

Then I went for a walk while that toasted my battery. From those one hundred images I picked the 78 I liked the best.

