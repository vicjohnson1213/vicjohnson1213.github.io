$(function() {
    $('.smooth-scroll').click(function(e) {
        e.preventDefault();

        var target = this.hash;
        var $target = $(target);

        $('html, body').stop().animate({
            scrollTop: ($target.offset().top)
        }, 1000, 'easeInOutCubic');
    });

    updateScroll();
    $(window).scroll(updateScroll);
    $(window).resize(updateScroll);
});

function updateScroll() {
    var scroll = $(window).scrollTop();

    if ((scroll < ($('#about-me-page').offset().top - 40))) {
        // home page
        setLight();

        $('#home-btn').addClass('active');
        $('#about-me-btn').removeClass('active');
        $('#portfolio-btn').removeClass('active');
    } else if ((scroll < ($('#portfolio-page').offset().top - 40))) {
        // about me page
        setDark();

        $('#home-btn').removeClass('active');
        $('#about-me-btn').addClass('active');
        $('#portfolio-btn').removeClass('active');
    } else {
        // portfolio page
        setLight();

        $('#home-btn').removeClass('active');
        $('#about-me-btn').removeClass('active');
        $('#portfolio-btn').addClass('active');
    }    
}

function setLight() {
    $('.nav-menu').removeClass('dark');
    $('.media-icons').removeClass('dark');
    $('.navbar-bg').removeClass('dark');
    $('.arrow-container').removeClass('hidden');
}

function setDark() {
    $('.nav-menu').addClass('dark');
    $('.media-icons').addClass('dark');
    $('.navbar-bg').addClass('dark');
    $('.arrow-container').addClass('hidden');
}