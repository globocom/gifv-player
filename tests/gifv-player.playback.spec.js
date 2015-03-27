/*global window, $, GifvPlayer, spyOn, FakeVideo, describe, it, expect, beforeEach, afterEach */

describe('GifvPlayer - Playback', function () {
    'use strict';

    var fixture = [
        '<div class="gifv-player">',
        '<video poster="cover.gif" data-gifv-original="original.gif" preload="none" loop="true">',
        '<source src="original.mp4" type="video/mp4" />',
        '<source src="original.ogg" type="video/ogg" />',
        '<img src="cover.gif" />',
        '</video>',
        '</div>',

        '<div class="gifv-player">',
        '<video poster="cover2.gif" data-gifv-original="original2.gif" preload="none" loop="true">',
        '<source src="original2.mp4" type="video/mp4" />',
        '<source src="original2.ogg" type="video/ogg" />',
        '<img src="cover2.gif" />',
        '</video>',
        '</div>'
    ].join('');

    beforeEach(function () {
        var $fixture = $('<div id="fixture"></div>');
        $fixture.html(fixture);
        $('body').append($fixture);
    });

    afterEach(function () {
        this.player.destroy();
        $('#fixture').remove();
    });

    describe('of gif file', function () {
        beforeEach(function () {
            this.simulateDisabledVideoSupport();

            this.player = new GifvPlayer();
            this.$firstVideo = $('.gifv-player').eq(0);
            this.$secondVideo = $('.gifv-player').eq(1);
        });

        describe('on play', function () {
            it('works with touch-start event', function () {
                this.$firstVideo.trigger('touchstart');
                expect(this.$firstVideo.hasClass('gifv-player-playing')).toEqual(true);
            });

            it('adds `playing` class', function () {
                this.$firstVideo.click();
                expect(this.$firstVideo.hasClass('gifv-player-playing')).toEqual(true);
            });

            it('swaps cover with original image', function () {
                this.$firstVideo.click();
                expect(this.$firstVideo.find('> img').attr('src')).toEqual('original.gif');
            });

            it('pauses other videos', function () {
                this.$secondVideo.click();
                expect(this.player.isPaused(this.$secondVideo)).toBe(false);

                this.$firstVideo.click();
                expect(this.player.isPaused(this.$secondVideo)).toBe(true);
                expect(this.player.isPaused(this.$firstVideo)).toBe(false);
            });
        });

        describe('on pause', function () {
            it('removes `playing` class', function () {
                this.$firstVideo.click();
                this.$firstVideo.click();
                expect(this.$firstVideo.hasClass('gifv-player-playing')).toEqual(false);
            });

            it('works with touch-start event', function () {
                this.$firstVideo.trigger('touchstart');
                this.$firstVideo.trigger('touchstart');
                expect(this.$firstVideo.hasClass('gifv-player-playing')).toEqual(false);
            });

            it('swaps current image with cover', function () {
                this.$firstVideo.click();
                this.$firstVideo.click();

                expect(this.$firstVideo.find('> img').attr('src')).toEqual('cover.gif');
            });
        });
    });

    describe('of video file', function () {
        beforeEach(function () {
            $('video').each(function () {
                FakeVideo.injectPlaybackMethods(this);
            });

            this.$firstVideo = $('.gifv-player').eq(0);
            this.$secondVideo = $('.gifv-player').eq(1);

            this.simulateEnabledVideoSupport();
            this.player = new GifvPlayer();
        });

        describe('on play', function () {
            it('plays video', function () {
                this.$firstVideo.click();
                expect(this.$firstVideo.find('video')[0].paused).toBe(false);
            });

            it('pauses other videos', function () {
                this.$secondVideo.click();
                expect(this.$secondVideo.find('video')[0].paused).toBe(false);

                this.$firstVideo.click();
                expect(this.$firstVideo.find('video')[0].paused).toBe(false);
                expect(this.$secondVideo.find('video')[0].paused).toBe(true);
            });
        });

        describe('on pause', function () {
            it('pauses video', function () {
                this.$firstVideo.click();
                this.$firstVideo.click();
                expect(this.$firstVideo.find('video')[0].paused).toBe(true);
            });
        });
    });
});
