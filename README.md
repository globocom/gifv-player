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
tag with the available video formats in `source` tags, a `img` tag for
the video thumbnail and the original gif URL in the `data-gifv-original`
attribute as a fallback for browsers that don't support video.

```html
<div class="gifv-player">
    <video preload="none" loop="loop" width="446" height="252">
        <source type="video/webm" src="sample-animated.webm" />
        <source type="video/mp4" src="sample-animated.mp4" />
    </video>
    <img src="sample-poster.png" width="446" height="252"
        data-gifv-original="sample-animated.gif" />
    <div class="gifv-player-overlay"></div>
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


## Lessons learned / video support gotchas

This library was tested on multiple browsers and devices and some issues
required workarounds.

The following list may help debugging playback problems or applying custom CSS
or having playback issues.


### Click is not triggered

On some versions of Safari on iOs, tapping on the video may not trigger a click.

**Solution:** Initially hide the video tag with `display:none` and show on play.


### Poster image is not loaded / blackened

On Chrome for iOs the image on `poster` isn't loaded.

**Solution:** Use an `img` tag on top of the `video` tag.


### Video tag dimensions are ignored

On iOs, [video dimensions are not applied][video-dimensions-stack-overflow],
it seems that the video file is not loaded and default iOs dimensions are used.

**Solution:** Make `video` tag use `position:absolute` and have 100% of the
`.gifv-player` container's dimensions. Use the `img` to stretch the container
to the intended dimensions. Control the visibility of the `img` with
`visibility:hidden/visible`.

[video-dimensions-stack-overflow]: http://stackoverflow.com/questions/14250583/safari-on-ipad-ios6-does-not-scale-html5-video-to-fill-100-of-page-width


### Video is stuck (paused) on fullscreen after second play

On iOs, after the first play, the video may get stuck on pause because clicking
the "OK" or "Done" button on the fullscreen view does not pause the video.

**Solution**: Force the video to pause on `webkitendfullscreen` event.


### `loadeddata` event isn't triggered on IE 9 (maybe IE9+).

This event was used to hide the poster image. The video was playing but it was
covered by the image.

**Solution**: Additionally to listening to the `loadeddata` event, use the
`play` event.


### Weird playback in some browsers

It seems that Chrome plays Webm better than mp4, or the video may be malformed.
It might be a codec issue. This is not easily reproduced.

**Solution:** Usually, `webm` produces smaller file sizes and is better
supported, add the `webm` source tag before the `mp4` tag to make it first
choice for the browser.
