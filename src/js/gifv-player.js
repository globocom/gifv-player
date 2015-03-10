/*global window, jQuery */

function GifvPlayer() {
    'use strict';
    this.init.apply(this, arguments);
}

(function (window, $) {
    'use strict';

    var VideoController, GifController;

    VideoController = {
        play: function ($element) {
            $element[0].play();
        },
        pause: function ($element) {
            $element[0].pause();
        },
        isPaused: function ($element) {
            return $element[0].paused;
        }
    };

    GifController = {
        play: function ($element) {
            $element.find('> img').data('gifv-playing', true);
            $element.find('> img').attr('src', $element.data('gifv-original'));
        },
        pause: function ($element) {
            $element.find('> img')
                .data('gifv-playing', false)
                .attr('src', $element.attr('poster'));
        },
        isPaused: function ($element) {
            return !$element.find('> img').data('gifv-playing');
        }
    };

    GifvPlayer.prototype = {
        init: function (options) {
            this.options = options || {};

            if (this.hasVideoSupport()) {
                this.controller = VideoController;
            } else {
                this.controller = GifController;
            }

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
            if (this.controller.isPaused($video)) {
                this.play($video);
            } else {
                this.pause($video);
            }
        },
        play: function ($video) {
            var $currentVideo = $(document).data('gifv-current');
            if ($currentVideo) {
                this.pause($currentVideo);
            }

            $(document).data('gifv-current', $video);

            this.controller.play($video);
        },
        pause: function ($video) {
            $(document).removeData('gifv-current');

            this.controller.pause($video);
        },
        hasVideoSupport: function () {
            var testVideo = document.createElement('video');
            return (
                !!testVideo.canPlayType && (
                    (testVideo.canPlayType('video/mp4') !== '') || (testVideo.canPlayType('video/ogg') !== '')
                )
            );
        }
    };

}(this, jQuery));
