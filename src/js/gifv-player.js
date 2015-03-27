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
            $element.find('video')[0].play();
        },
        pause: function ($element) {
            $element.find('> video')[0].pause();
        }
    };

    GifController = {
        play: function ($element) {
            var $img = $element.find('> img');
            $img.attr('src', $img.data('gifv-original'));
        },
        pause: function ($element) {
            var $img = $element.find('> img');
            $img.attr('src', $img.data('gifv-poster'));
        }
    };

    GifvPlayer.prototype = {
        selector: '.gifv-player',
        init: function (options) {
            this.options = options || {};
            this.videoSelector = this.selector + ' video';

            if (this.hasVideoSupport()) {
                this.controller = VideoController;
            } else {
                this.controller = GifController;
                this.storeOriginalSource();
            }

            this.bindEvents();
        },
        destroy: function () {
            $(document).off('.gifv');
            $(this.videoSelector).off('.gifv');
        },
        storeOriginalSource: function () {
            $('img', this.selector).each(function () {
                var $this = $(this);
                $this.data('gifv-poster', $this.attr('src'));
            });
        },
        bindEvents: function () {
            var player = this;

            $(document).on('click.gifv touchstart.gifv', this.selector, function (event) {
                event.preventDefault();

                var $player = $(this);
                player.playPause($player);
            });

            $(this.videoSelector).on('loadeddata.gifv', function () {
                $(this).parents(player.selector).eq(0).find('img').css('visibility', 'hidden');
            });
        },
        playPause: function ($video) {
            if (this.isPaused($video)) {
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
            $video.addClass('gifv-player-playing');

            this.controller.play($video);
        },
        pause: function ($video) {
            $(document).removeData('gifv-current');
            $video.removeClass('gifv-player-playing');

            this.controller.pause($video);
        },
        isPaused: function ($video) {
            return !$video.hasClass('gifv-player-playing');
        },
        hasVideoSupport: function () {
            var testVideo = document.createElement('video');
            return (
                !!testVideo.canPlayType && (
                    (testVideo.canPlayType('video/mp4') !== '') || (testVideo.canPlayType('video/webm') !== '')
                )
            );
        }
    };

}(this, jQuery));
