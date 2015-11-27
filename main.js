$(function() {
    $('.smooth-scroll').click(function(e) {
        e.preventDefault();

        var target = this.hash;
        var $target = $(target);

        $('html, body').stop().animate({
            scrollTop: ($target.offset().top)
        }, 1000, 'easeInOutCubic')
    });

    $(window).scroll(function() {
        var scroll = $(window).scrollTop();

        if (scroll >= ($('#about-me-page').offset().top - 70)) {
            $('.nav-menu').addClass('dark');
            $('.media-icons').addClass('dark');
            $('.navbar-bg').addClass('dark');
            $('.arrow-container').addClass('hidden');
        } else {
            $('.nav-menu').removeClass('dark');
            $('.media-icons').removeClass('dark');
            $('.navbar-bg').removeClass('dark');
            $('.arrow-container').removeClass('hidden');
        }
    })
});