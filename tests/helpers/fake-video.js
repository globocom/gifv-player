FakeVideo = {};
FakeVideo.injectPlaybackMethods = function (element) {
    var testVideo = document.createElement('video');
    if (!testVideo.canPlayType) {
        element.paused = true;
        element.play = function () {
            this.paused = false;
        };
        element.pause = function () {
            this.paused = true;
        };
    }
};
