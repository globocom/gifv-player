/*global window, $, GifvPlayer, spyOn, FakeVideo, describe, it, expect, beforeEach, afterEach */

describe('GifvPlayer - Playback', function () {
    'use strict';

    var fixture = [
        '<div class="gifv-player">',
        '<video preload="none" loop="true">',
        '<source src="original.mp4" type="video/mp4" />',
        '<source src="original.ogg" type="video/ogg" />',
        '</video>',
        '<img src="cover.gif" data-gifv-original="original.gif" />',
        '</div>',

        '<div class="gifv-player">',
        '<video preload="none" loop="true">',
        '<source src="original2.mp4" type="video/mp4" />',
        '<source src="original2.ogg" type="video/ogg" />',
        '</video>',
        '<img src="cover2.gif" data-gifv-original="original2.gif" />',
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
            it('updates player `playing` state', function () {
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

            this.$firstVideo = $('.gifv-player').eq(0);
            this.$secondVideo = $('.gifv-player').eq(1);

            this.simulateEnabledVideoSupport();
            this.player = new GifvPlayer();
        });

        it('initially hides video elements', function () {
            expect(this.$firstVideo.find('video').css('display')).toEqual('none');
        });

        describe('on play', function () {
            it('plays video', function () {
                this.$firstVideo.click();
                expect(this.$firstVideo.find('video')[0].paused).toBe(false);
            });

            it('updates player `playing` state', function () {
                this.$firstVideo.click();
                expect(this.$firstVideo.hasClass('gifv-player-playing')).toEqual(true);
            });

            it('pauses other videos', function () {
                this.$secondVideo.click();
                expect(this.$secondVideo.find('video')[0].paused).toBe(false);

                this.$firstVideo.click();
                expect(this.$firstVideo.find('video')[0].paused).toBe(false);
                expect(this.$secondVideo.find('video')[0].paused).toBe(true);
            });

            it('hides poster when video plays', function () {
                var $video = this.$firstVideo.find('video'),
                    $poster = this.$firstVideo.find('img');

                $video.trigger('play');
                expect($poster.css('visibility')).toEqual('hidden');
            });
        });

        describe('on pause', function () {
            it('pauses video', function () {
                this.$firstVideo.click();
                this.$firstVideo.click();
                expect(this.$firstVideo.find('video')[0].paused).toBe(true);
            });

            describe('after exiting fullscreen on webkit', function () {
                beforeEach(function () {
                    this.$video = this.$firstVideo.find('video');
                    this.$poster = this.$firstVideo.find('img');

                    this.$poster.hide();

                    this.$video.trigger('webkitendfullscreen');
                });

                it('shows poster', function () {
                    expect(this.$poster.css('visibility')).toEqual('visible');
                });

                it('hides the video element', function () {
                    expect(this.$poster.css('display')).toEqual('none');
                });

                it('updates player `playing` state', function () {
                    this.$firstVideo.click();
                    expect(this.$firstVideo.hasClass('gifv-player-playing')).toEqual(true);
                });
            });
        });
    });
});
