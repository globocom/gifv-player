[![Travis Build Status](https://travis-ci.org/globocom/gifv-player.svg)](https://travis-ci.org/globocom/gifv-player)
[![Coverage Status](https://img.shields.io/coveralls/globocom/gifv-player.svg)](https://coveralls.io/r/globocom/gifv-player)

# gifv-player

Javascript library for playing [gifv][gifv] files with video browser support detection
and fallback for pure gif.

[gifv]: http://imgur.com/blog/2014/10/09/introducing-gifv/


## Usage

Include the `dist/js/gifv-player.min.js` script in the page and initialize.

    ```html
    <script src="gifv-player.min.js"></script>
    <script>new GifvPlayer();</script>
    ```

The script will search the page for `.gifv-player` wrappers containing a `video`
tag with the available video formats in `source` tags, a `poster` attribute for
the video thumbnail and the original gif URL in the `data-gifv-original`
attribute as a fallback.

    ```html
    <div class="gifv-player">
        <video poster="sample-poster.png" data-gifv-original="sample-animated.gif" preload="none" loop="true">
            <source type="video/mp4" src="sample-animated.mp4" />
            <source type="video/webm" src="sample-animated.webm" />
        </video>
    </div>
    ```


## Gif conversion to video

`gifv` isn't really an image or video format, it is a technique
[introduced by imgur][gifv] to reduce bandwidth usage by converting animated 
GIF files to browser supported video formats.

[Thumbor][Thumbor] is a great companion to `gifv-player` as it allows
[on-the-fly animated GIF conversion][Thumbor-Gifv] to webm and mp4 formats.

[Thumbor]: https://github.com/thumbor/thumbor
[Thumbor-Gifv]: https://github.com/thumbor/thumbor/wiki/GifV
