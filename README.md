# dunes-node 
[![Test and build](https://github.com/Angael/dunes-node/actions/workflows/node.js.yml/badge.svg)](https://github.com/Angael/dunes-node/actions/workflows/node.js.yml)

NPM library for easy video compression.

Requires user to have installed `ffmpeg` and `ffprobe` and know path to those binaries.

## Docs

[Library documentation](docs/README.md)


## Development workflow

1. Write code
2. Commit & Push
3. `npm version patch`
4. `npm publish`

> Use `yarn link` to test this library locally in other projects before publishing

> To test library on linux (ffmpeg binary might behave different there) use docker `docker build .`

### Maybe useful links
https://cmdcolin.github.io/posts/2022-05-27-youmaynotneedabundler
