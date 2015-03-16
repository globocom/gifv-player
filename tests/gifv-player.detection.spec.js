/*global window, $, GifvPlayer, spyOn, describe, it, expect, beforeEach, afterEach */

describe('GifvPlayer - Detects', function () {
    'use strict';

    beforeEach(function () {
        this.dummyVideo = document.createElement('dummy');
        this.supportedTypes = [
            'video/mp4',
            'video/webm'
        ];

        spyOn(document, 'createElement').andReturn(this.dummyVideo);
    });

    afterEach(function () {
        this.player.destroy();
    });

    describe('support for', function () {
        beforeEach(function () {
            var context = this;
            this.dummyVideo.canPlayType = function (mime) {
                if (context.supportedTypes.indexOf(mime) >= 0) {
                    return 'maybe';
                }
                return '';
            };
        });

        it('general video', function () {
            this.player = new GifvPlayer();
            expect(this.player.hasVideoSupport()).toBe(true);
        });

        it('mp4 format', function () {
            this.supportedTypes = ['video/mp4'];

            this.player = new GifvPlayer();
            expect(this.player.hasVideoSupport()).toBe(true);
        });

        it('webm format', function () {
            this.supportedTypes = ['video/webm'];

            this.player = new GifvPlayer();
            expect(this.player.hasVideoSupport()).toBe(true);
        });
    });

    describe('no support', function () {
        it('for general video', function () {
            this.player = new GifvPlayer();
            expect(this.player.hasVideoSupport()).toBe(false);
        });

        it('for any format', function () {
            this.dummyVideo.canPlayType = function () { return ''; };

            this.player = new GifvPlayer();
            expect(this.player.hasVideoSupport()).toBe(false);
        });
    });
});
