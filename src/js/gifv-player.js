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
