$(function() {
    $('.smooth-scroll').click(function(e) {
        e.preventDefault();

        var target = this.hash;
        var $target = $(target);
        
        $('html, body').stop().animate({
            scrollTop: ($target.offset().top - 80)
        }, 1000, 'easeInOutCubic')
    });

    $(window).scroll(function() {
        var scroll = $(window).scrollTop();

        if (scroll >= ($('#about-me-page').offset().top - 90)) {
            $('.menu').addClass('dark');
            $('.arrow-container').addClass('hidden');
        } else {
            $('.menu').removeClass('dark');
            $('.arrow-container').removeClass('hidden');
        }
    })
});