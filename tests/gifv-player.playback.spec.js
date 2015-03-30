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
            it('adds overlay for styling', function () {
                expect(this.$firstVideo.find('.gifv-player-overlay').length).toEqual(1);
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
                var controller = this.player.controller;

                this.$secondVideo.click();
                expect(controller.isPaused(this.$secondVideo)).toBe(false);

                this.$firstVideo.click();
                expect(controller.isPaused(this.$secondVideo)).toBe(true);
                expect(controller.isPaused(this.$firstVideo)).toBe(false);
            });
        });

        describe('with autostart', function () {
            describe('on mouseenter', function () {
                it('play video', function () {
                    var controller = this.player.controller;
                    this.$firstVideo.trigger('mouseover');

                    expect(controller.isPaused(this.$firstVideo)).toBe(false);
                    expect(controller.isPaused(this.$secondVideo)).toBe(true);
                });

                it('pauses other videos', function () {
                    var controller = this.player.controller;

                    this.$secondVideo.click();

                    expect(controller.isPaused(this.$secondVideo)).toBe(false);

                    this.$firstVideo.trigger('mouseover');
                    expect(controller.isPaused(this.$secondVideo)).toBe(true);
                    expect(controller.isPaused(this.$firstVideo)).toBe(false);
                });
            });
        });

        describe('on pause', function () {
            it('removes `playing` class', function () {
                this.$firstVideo.click();
                this.$firstVideo.click();
                expect(this.$firstVideo.hasClass('gifv-player-playing')).toEqual(false);
            });

            it('swaps current image with cover', function () {
                this.$firstVideo.click();
                this.$firstVideo.click();

                expect(this.$firstVideo.find('> img').attr('src')).toEqual('cover.gif');
            });
        });
    });

    describe('of gif file', function () {
        beforeEach(function () {
            this.simulateDisabledVideoSupport();

            this.player = new GifvPlayer({ autostart: false });
            this.$firstVideo = $('.gifv-player').eq(0);
            this.$secondVideo = $('.gifv-player').eq(1);
        });

        describe('without autostart', function () {
            describe('on mouseenter', function () {
                it('don`t play video', function () {
                    var controller = this.player.controller;
                    this.$firstVideo.trigger('mouseover');

                    expect(controller.isPaused(this.$firstVideo)).toBe(true);
                });

                it('don`t pauses other videos', function () {
                    var controller = this.player.controller;

                    this.$secondVideo.click();
                    expect(controller.isPaused(this.$secondVideo)).toBe(false);

                    this.$firstVideo.trigger('mouseover');
                    expect(controller.isPaused(this.$secondVideo)).toBe(false);
                    expect(controller.isPaused(this.$firstVideo)).toBe(true);
                });
            });
        });
    });

    describe('of video file', function () {
        beforeEach(function () {
            $('video').each(function () {
                FakeVideo.injectPlaybackMethods(this);
            });

            this.simulateEnabledVideoSupport();
            this.player = new GifvPlayer();

            this.$firstVideo = $('video').eq(0);
            this.$secondVideo = $('video').eq(1);
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
