window.onscroll = function (ev) {
    part_1 = $('#part_1').position();
    part_2 = $('#part_2').position();

    if ($(window).scrollTop() + $(window).height() + 100 >= $(document).height()) {
        $(".footer_animation").addClass('animation_start');

    } else if (window.scrollY >= part_2.top - 300) {
        $(".part_2_animation").addClass('animation_start');

    } else if (window.scrollY >= part_1.top - 300) {
        $(".part_1_animation").addClass('animation_start');
    }
};
