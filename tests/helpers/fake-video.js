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
jasmine.Spec.prototype.simulateDisabledVideoSupport = function () {
    var spec = this;
    var dummyVideo = document.createElement('dummy');

    spyOn(document, 'createElement').andCallFake(function () {
        spec.removeAllSpies();
        return dummyVideo;
    });
};
jasmine.Spec.prototype.simulateEnabledVideoSupport = function () {
    var spec = this;
    var dummyVideo = document.createElement('dummy');
    dummyVideo.canPlayType = function () {
        return 'maybe';
    };

    spyOn(document, 'createElement').andCallFake(function () {
        spec.removeAllSpies();
        return dummyVideo;
    });
};
