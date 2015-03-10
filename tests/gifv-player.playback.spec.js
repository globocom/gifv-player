/*global window, $, GifvPlayer, spyOn, FakeVideo, describe, it, expect, beforeEach, afterEach */

describe('GifvPlayer - Playback', function () {
    'use strict';

    var fixture = [
        '<video poster="cover.gif" data-gifv-original="original.gif" preload="none" loop="true">',
        '<source src="original.mp4" type="video/mp4" />',
        '<source src="original.ogg" type="video/ogg" />',
        '<img src="cover.gif" />',
        '</video>',
        '<video poster="cover2.gif" data-gifv-original="original2.gif" preload="none" loop="true">',
        '<source src="original2.mp4" type="video/mp4" />',
        '<source src="original2.ogg" type="video/ogg" />',
        '<img src="cover2.gif" />',
        '</video>'
    ].join('');

    beforeEach(function () {
        var $fixture = $('<div id="fixture"></div>');
        $fixture.html(fixture);
        $('body').append($fixture);
        $('video').each(function () {
            FakeVideo.injectPlaybackMethods(this);
        });

        this.dummyVideo = document.createElement('dummy');
        spyOn(document, 'createElement').andReturn(this.dummyVideo);

        this.$firstVideo = $('video').eq(0);
        this.$secondVideo = $('video').eq(1);
    });

    afterEach(function () {
        this.player.destroy();
        $('#fixture').remove();
    });

    describe('of gif file', function () {
        beforeEach(function () {
            this.player = new GifvPlayer();
        });

        describe('on play', function () {
            it('swaps cover with original image', function () {
                this.$firstVideo.click();
                expect(this.$firstVideo.find('> img').attr('src')).toEqual('original.gif');
            });

            it('pauses other videos', function () {
                var controller = this.player.controller;

                this.$secondVideo.click();
                expect(controller.isPaused(this.$secondVideo)).toBe(false);

                this.$firstVideo.click();
                expect(controller.isPaused(this.$secondVideo)).toBe(true);
                expect(controller.isPaused(this.$firstVideo)).toBe(false);
            });
        });

        describe('on pause', function () {
            it('swaps current image with cover', function () {
                this.$firstVideo.click();
                this.$firstVideo.click();
                expect(this.$firstVideo.find('> img').attr('src')).toEqual('cover.gif');
            });
        });
    });

    describe('of video file', function () {
        beforeEach(function () {
            this.dummyVideo.canPlayType = function () {
                return 'maybe';
            };
            this.player = new GifvPlayer();
        });

        describe('on play', function () {
            it('plays video', function () {
                this.$firstVideo.click();
                expect(this.$firstVideo[0].paused).toBe(false);
            });

            it('pauses other videos', function () {
                this.$secondVideo.click();
                expect(this.$secondVideo[0].paused).toBe(false);

                this.$firstVideo.click();
                expect(this.$firstVideo[0].paused).toBe(false);
                expect(this.$secondVideo[0].paused).toBe(true);
            });
        });

        describe('on pause', function () {
            it('pauses video', function () {
                this.$firstVideo.click();
                this.$firstVideo.click();
                expect(this.$firstVideo[0].paused).toBe(true);
            });
        });
    });
});
