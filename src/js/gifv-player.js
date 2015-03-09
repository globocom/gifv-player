/*global window, jQuery */

function GifvPlayer(options) {
    'use strict';
    this.init(options);
}

(function (window, $) {
    'use strict';

    GifvPlayer.prototype = {
        init: function (options) {
            this.options = options || {};
            this.hasVideoSupport = this._hasVideoSupport();
            this.bindEvents();
        },
        destroy: function () {
            $(document).off('.gifv');
        },
        bindEvents: function () {
            var player = this;

            $(document).on('click.gifv', 'video', function (event) {
                event.preventDefault();

                var $video = $(this);
                player.playPause($video);
            });
        },
        playPause: function ($video) {
            if (this.isPaused($video)) {
                this.play($video);
            } else {
                this.pause($video);
            }
        },
        isPaused: function ($video) {
            if (this.hasVideoSupport) {
                return $video[0].paused;
            }

            return !$video.find('> img').data('gifv-playing');
        },
        play: function ($video) {
            var $currentVideo = $(document).data('gifv-current');
            if ($currentVideo) {
                this.pause($currentVideo);
            }

            $(document).data('gifv-current', $video);

            if (this.hasVideoSupport) {
                $video[0].play();
            } else {
                $video.find('> img').data('gifv-playing', true);
                $video.find('> img').attr('src', $video.data('gifv-original'));
            }
        },
        pause: function ($video) {
            $(document).removeData('gifv-current');

            if (this.hasVideoSupport) {
                $video[0].pause();
            } else {
                $video.find('> img')
                    .data('gifv-playing', false)
                    .attr('src', $video.attr('poster'));
            }
        },
        _hasVideoSupport: function () {
            var testVideo = document.createElement('video');
            return (
                !!testVideo.canPlayType && (
                    (testVideo.canPlayType('video/mp4') !== '') || (testVideo.canPlayType('video/ogg') !== '')
                )
            );
        }
    };

}(this, jQuery));
