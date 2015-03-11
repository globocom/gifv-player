# gifv-player

Javascript library for playing [gifv](http://imgur.com/blog/2014/10/09/introducing-gifv/) files with video browser support detection
and fallback for pure gif.


## Usage

Include the `dist/js/gifv-player.min.js` script in the page and initialize.

    <script src="gifv-player.min.js"></script>
    <script>new GifvPlayer();</script>

The script will search the page for `.gifv-player` wrappers containing a `video`
tag with the available video formats in `source` tags, a `poster` attribute for
the video thumbnail and the original gif URL in the `data-gifv-original`
attribute as a fallback.

    <div class="gifv-player">
        <video poster="sample-poster.png" data-gifv-original="sample-animated.gif" preload="none" loop="true">
            <source type="video/mp4" src="sample-animated.mp4" />
            <source type="video/webm" src="sample-animated.webm" />
        </video>
    </div>
