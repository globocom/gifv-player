/*global window, $, GifvPlayer, spyOn, FakeVideo, HTMLElement, describe, it, expect, beforeEach, afterEach */

describe('GifvPlayer - Loop Emulation', function () {
    'use strict';

    var fixture = [
        '<div class="gifv-player">',
        '<video poster="cover.gif" data-gifv-original="original.gif" preload="none" loop="true">',
        '<source src="original.mp4" type="video/mp4" />',
        '<source src="original.ogg" type="video/ogg" />',
        '<img src="cover.gif" />',
        '</video>',
        '</div>'
    ].join('');

    beforeEach(function () {
        this.$fixture = $('<div id="fixture"></div>');
        this.$fixture.html(fixture);
        $('body').append(this.$fixture);

        FakeVideo.injectPlaybackMethods(HTMLElement.prototype);

        this.simulateEnabledVideoSupport();
        this.player = new GifvPlayer();
    });

    afterEach(function () {
        this.player.destroy();
        this.$fixture.remove();
    });

    it('replaces video element with a clone and plays', function () {
        var $video = this.$fixture.find('video'),
            clone = document.createElement('dummy'),
            $clone = $(clone);

        clone.play = function () { return; };

        spyOn($.fn, 'clone').andReturn($clone);
        spyOn(clone, 'play');

        $video.trigger('ended');

        expect($('dummy').length).toEqual(1);
        expect($clone[0]).toNotBe($video[0]);

        expect($clone[0].play).toHaveBeenCalled();
    });
});
