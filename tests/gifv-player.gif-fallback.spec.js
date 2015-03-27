/*global window, $, GifvPlayer, spyOn, FakeVideo, describe, it, expect, beforeEach, afterEach */

describe('GifvPlayer - Gif Fallback', function () {
    'use strict';

    var fixture = [
        '<div class="gifv-player">',
        '<video data-gifv-original="original.gif" width="200" height="100">',
        '<source src="original.mp4" type="video/mp4" />',
        '</video>',
        '<img src="cover.gif" data-gifv-original="original.gif" width="200" height="100">',
        '</div>'
    ].join('');

    beforeEach(function () {
        this.$fixture = $('<div id="fixture"></div>');
        this.$fixture.html(fixture);
        $('body').append(this.$fixture);

        this.simulateDisabledVideoSupport();

        this.player = new GifvPlayer();

        this.$wrapper = $('.gifv-player');
        this.$img = this.$wrapper.find('img');
    });

    afterEach(function () {
        this.player.destroy();
        this.$fixture.remove();
    });

    it('copies video poster to image src', function () {
        expect(this.$img.attr('src')).toBe('cover.gif');
    });

    it('copies dimensions to image', function () {
        expect(this.$img.attr('width')).toBe('200');
        expect(this.$img.attr('height')).toBe('100');
    });

    it('stores poster on data-attribute', function () {
        expect(this.$img.data('gifv-poster')).toBe('cover.gif');
    });

    it('stores original on data-attribute', function () {
        expect(this.$img.data('gifv-original')).toBe('original.gif');
    });
});
