# Spitlo.github.io (spitlo.com)

This is my personal website, generated by [Zola](https://getzola.org) and hosted with GitHub pages under a custom domain (<https://spitlo.com>).

## Notes to self

### Tags & icons

After adding a new tag, check [Simpe Icons](https://simpleicons.org/). If the tag has a corresponding icon, add it to `bin/update_icons`.

Zola doesn’t always generate slugs that match the file names on Simple Icons. There are mappings in both `bin/update_icons` and `bin/iconColors.js` to handle this.

### Debug

To output all Tera variables in code, add this:

```html
  <!---{{ __tera_context }}--->
```

## To do

- [ ] Make site work in Firefox Reader View
- [ ] Embed hidden audio links in pages that player can pick up on?
- [ ] Improve favicon
- [ ] Make an official 88x31 button
- [ ] Games:
  - [x] Don’t show game title and description as part of game console
- [x] (Sigh) Dark mode (Override in dotmatrix mode)
- [x] Add `first_commit` date to code projects
- [x] Add command for unlocking contact information in footer
- [x] Add favicon
- [x] Add link to source markdown file on every page
- [x] Create a start page
- [x] Finish tags landing page
- [x] Finish tech tags page
- [x] Fix footer width issues on small screens
- [x] Fix problem with missing spaces in text games
- [x] Fix taxonomy width issues on small screens
- [x] Hide pagination in dotmatrix mode
- [x] Implement keyboard navigation
  - [x] Command mode ("`:`")
  - [x] Help ("`?`")
  - [x] Menu items ("`H`", "`C`", "`M`", "`T`")
  - [x] Search ("`/`")
  - [x] `1`-`9` triggers the first nine links in content area
  - [x] ~~Command palette ("`Shift`+`Cmd/Ctrl`+`p`")~~
  - [x] ~~Expand TOCs~~
- [x] Implement search?
- [x] Improve icon handling
- [x] Improve search
  - [x] Implement search for mobile
  - [x] Fix bug with search not working after editing query
  - [x] Add ellipsis in front of cropped text
- [x] In the heel, always put a right-aligned `$white` shape to connect with the "cloud" in the footer
- [x] Let `showCommandLineConfirm` accept key presses for confirm/decline
- [x] Make font smaller in SVG titles (text overlaps in Tor Browser)
- [x] Nicer code blocks in dotmatrix mode
- [x] Randomize start page
- [x] Styling for Previous/Next article links
- [x] Update the ~~`balls`~~ `shapes` macro to take a ~~`shape`~~ `type` argument, to match the squares and triangles of the header and footer
- [x] Use `word_count` to decide whether to show a TOC or not
- [x] ~~Add controls for audio player~~
- [x] ~~Consider using~~ Use `<script type="module">` to avoid loading JavaScript at all in older browsers
- [x] ~~Create GitHub action that deploys site only when editing files directly in GitHub. Possible?~~ Use `workflow_dispatch` to enable deploys from GitHub
- [x] ~~Fix numbered links on startpage (starts from 1 on each new `<ul>`)~~
- [x] ~~Switch to using OGG instead of MP3 for audio?~~ Support [is not there](https://caniuse.com/?search=ogg)
