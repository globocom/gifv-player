/*global window, $, GifvPlayer, sinon, describe, it, expect, beforeEach, afterEach */

describe('GifvPlayer - Detects', function () {
    'use strict';

    beforeEach(function () {
        this.dummyVideo = document.createElement('dummy');
        this.supportedTypes = [
            'video/mp4',
            'video/ogg'
        ];

        spyOn(document, 'createElement').andReturn(this.dummyVideo);
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
            var player = new GifvPlayer();
            expect(player.hasVideoSupport).toBe(true);
        });

        it('mp4 format', function () {
            this.supportedTypes = ['video/mp4'];

            var player = new GifvPlayer();
            expect(player.hasVideoSupport).toBe(true);
        });

        it('ogg format', function () {
            this.supportedTypes = ['video/ogg'];

            var player = new GifvPlayer();
            expect(player.hasVideoSupport).toBe(true);
        });
    });

    describe('no support', function () {
        it('for general video', function () {
            var player = new GifvPlayer();
            expect(player.hasVideoSupport).toBe(false);
        });

        it('for any format', function () {
            this.dummyVideo.canPlayType = function () { return '' };

            var player = new GifvPlayer();
            expect(player.hasVideoSupport).toBe(false);
        });
    });
});
