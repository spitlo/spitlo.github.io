+++
title = "Dotfiles"
description = "Various configs, scripts and aliases"
date = 2013-07-06

[taxonomies]
technologies = ["Shell", "Python", "Perl", "JavaScript"]

[extra]
repo = "https://github.com/spitlo/dotfiles"
+++

I keep most of my aliases, functions and config files in a dotfiles repo. They are currently used on two Macs running Mojave, one Pinebook Pro running Manjaro, an Android running Termux on LineageOS and on several instances of Ubuntu Server.

Some of this stuff probably only makes sense for me, but there are a few gems here and there that might be of use for others.

Below are a few of my most used functions/aliases:

* [cdp](https://github.com/spitlo/dotfiles/blob/b601ed079b16e6651545f579d2a437f487af2965/.functions#L438-L484)

  This allows me to jump quickly into project folders. If the project contains an `.nvmrc` or `.python-version` file, the correct versions of `node` and `pyhton` are set.

  The function uses `$PROJECT_FOLDER` to know where to look. I set it in a file kept out of source control.

  There is a corresponding [bash completion script](https://github.com/spitlo/dotfiles/blob/6f41ade4e2ff75e7ddb147d727ec8ad53917d87a/.bash_completions/cdp), so if I set `$LOCAL_PROJECTS` to a space separated string of project names, I get tab completion and can navigate EVEN QUICKER!

* [xt](https://github.com/spitlo/dotfiles/blob/b601ed079b16e6651545f579d2a437f487af2965/.functions#L119-L156)

  This is so I never have to learn the flags for unrar, unzip, gunzip, tar et al.

  ![XKCD: Tar](https://imgs.xkcd.com/comics/tar.png)
