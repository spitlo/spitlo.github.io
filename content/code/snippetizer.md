+++
title = "Snippetizer"
description = "Make audio snippets quickly"
date = 2021-03-26

[taxonomies]
technologies = ["Bash", "FFmpeg"]

[extra]
repo = "https://github.com/spitlo/snippetizer"
first_commit_time = 2021-03-26
first_commit_message = "Once upon a time..."
+++

I made `snippetizer` to be able to quickly produce snippets of the material from [Stromata](/music/stromata). It uses `ffmpeg` and `ffprobe` and takes a few arguments:

```txt
  [start|middle|end]    What part of the file you want to snippet.
                        Defaults to 'middle'.
  [<any integer>]       Snippet length in seconds.
                        Defaults to '30'.
  [-o/--ogg]            Use ogg as output format instead of mp3.
  [-n/--nofade]         Don’t fade in and out.
```

If no arguments are supplied, it creates a 30 second mp3 snippet from the middle of a file, with 2 second fade-in and 3 second fade-out.
