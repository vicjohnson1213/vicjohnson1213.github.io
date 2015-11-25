$(function() {
    $('.smooth-scroll').click(function(e) {
        e.preventDefault();

        var target = this.hash;
        var $target = $(target);

        $('html, body').stop().animate({
            scrollTop: ($target.offset().top - 90)
        }, 1000, 'easeInOutCubic')
    });

    $(window).scroll(function() {
        var scroll = $(window).scrollTop();

        if (scroll >= ($('#about-me-page').offset().top - 70)) {
            $('.menu').addClass('dark');
        } else {
            $('.menu').removeClass('dark');
        }
    })
});