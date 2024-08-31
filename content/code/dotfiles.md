+++
title = "Dotfiles"
description = "Various configs, scripts and aliases"
date = 2020-11-26

[taxonomies]
technologies = ["Bash", "Python", "Perl", "JavaScript"]
categories = ["Work in Progress"]

[extra]
repo = "https://github.com/spitlo/dotfiles"
first_commit_time = 2013-07-06
first_commit_message = "For safekeeping"
+++

I keep most of my aliases, functions and config files in a dotfiles repo. They are currently used on one Mac running Monterey, one Mac running Pop!_OS Cosmic, one Raspberry Pi 400, an Android running Termux on LineageOS and on several instances of Ubuntu Server, so I try to make sure everything’s portable.

Some of this stuff probably only makes sense for me, but there are a few gems here and there that might be of use for others as well.

Below are a few of my most used functions/aliases:

## [`cdp`](https://github.com/spitlo/dotfiles/blob/b601ed079b16e6651545f579d2a437f487af2965/.functions#L438-L484)

This allows me to jump quickly into project folders. If the project contains an `.nvmrc` or `.python-version` file, the correct versions of `node` and `python` are set.

The function uses `$PROJECT_FOLDER` to know where to look. I set it in a file kept out of source control.

There is a corresponding [bash completion script](https://github.com/spitlo/dotfiles/blob/6f41ade4e2ff75e7ddb147d727ec8ad53917d87a/.bash_completions/cdp), so if I set `$LOCAL_PROJECTS` to a space separated string of project names, I get tab completion and can navigate EVEN QUICKER!

## [`xt`](https://github.com/spitlo/dotfiles/blob/b601ed079b16e6651545f579d2a437f487af2965/.functions#L119-L156)

This is so I never have to learn the flags for unrar, unzip, gunzip, tar et al. Cant’t remember where I got this function from initially, but here’s the obligatory [XKCD](https://xkcd.com/) strip:

  ![XKCD: Tar](https://imgs.xkcd.com/comics/tar.png)

## [`qrab`](https://github.com/spitlo/dotfiles/blob/b601ed079b16e6651545f579d2a437f487af2965/.functions#L706-L712)

This uses [`qrencode`](https://github.com/fukuchi/libqrencode) to create a QR code from whatever is in the clipboard and print it to the terminal. Very helpful when I need to move small pieces of information from my laptop to my phone quickly.

## [`weather`](https://github.com/spitlo/dotfiles/blob/b601ed079b16e6651545f579d2a437f487af2965/.functions#L771-L773)

I can never remember where to `curl` the weather from and what query strings to use, so now I just run `weather london` to get the London weather in a compact form.

## [`dict`](https://github.com/spitlo/dotfiles/blob/b601ed079b16e6651545f579d2a437f487af2965/.functions#L527-L531)

Basically the same as `weather` but for dictionary definitions.

## [`squash`](https://github.com/spitlo/dotfiles/blob/master/bin/squash)

I work on some projects that’s been around since the early 2010s, and I need a local clone, including all assets, for them to work properly when developing. So I need to keep gigs and gigs of images just lying about on my harddrive. But they don’t need to look pretty. So every once in a while I run:

```bash
find ./media/images -xdev -name '*.jpg' -mtime +360 -execdir squash {} \;
```

`squash` uses ImageMagicks’s `mogrify` to set the jpeg quality to one, then resets the file’s timestamp, to prevent possible overwrites when syncing with the production server. I can also run it with the environment variable `MINIMUM_SIZE` set, to only affect images of a significant size.

## [`update-tp`](https://github.com/spitlo/dotfiles/blob/master/bin/update-tp)

`update-tp` helps me to update a [Termux package](https://github.com/termux/termux-packages) in my fork, then create a consistently worded commit so I can do a PR. It’s pretty scary to contribute to popular projects and I want to make sure I get it right if I do.

## [`update`](https://github.com/spitlo/dotfiles/blob/master/bin/update)

`update` helps me keep some commands fresh across platforms, often by downloading the latest release from Github or similar and moving it to `~/bin`. This was mostly created out of frustration with the way Homebrew works on macOS, but I use it on Android ([Termux](https://github.com/termux/termux-app)) and Linux as well. At the time of writing, `update` supports updating the following commands:

 - [ascii-image-converter](https://github.com/TheZoraiz/ascii-image-converter)
 - [bat](https://github.com/sharkdp/bat)
 - [bombadillo](https://tildegit.org/sloum/bombadillo) (Broken at the time)
 - [croc](https://github.com/schollz/croc)
 - [delta](https://github.com/dandavison/delta)
 - [exa](https://github.com/ogham/exa)
 - [fzf](https://github.com/junegunn/fzf)
 - [grit](https://github.com/climech/grit)
 - [gron](https://github.com/tomnomnom/gron)
 - [h2c](https://github.com/curl/h2c)
 - [hyperfine](https://github.com/sharkdp/hyperfine)
 - [jq](https://github.com/stedolan/jq)
 - [micro](https://github.com/zyedidia/micro)
 - [navi](https://github.com/denisidoro/navi)
 - [nb](https://github.com/xwmx/nb)
 - [starship](https://github.com/starship/starship)
 - [svtplay-dl](https://github.com/spaam/svtplay-dl)
 - [wp-cli](https://github.com/wp-cli/wp-cli)
 - [youtube-dl](https://github.com/ytdl-org/youtube-dl)
 - [zola](https://github.com/getzola/zola)
