/* JavaScript content switcher by Louis Lazaris

If you want this to have back button functionality,
just comment in the lines in the code that are commented out.
*/

$(function() {

    var currHash,
        navLi = $('#navigation li'),
        navLinks = $('#navigation li a'),
        speed = 650;

    if (location.hash) {
        currHash = location.hash.split('#')[1];
    } else {
        currHash = "one";

        /*if (history.pushState) {
            history.pushState(null, null, '#' + currHash);
        } else {
            location.hash = '#' + currHash;
        }*/

    }

    function doSwitch(el) {

        if (el) {
            currHash = el[0].href.split('#')[1];
            el.addClass('selected');
        } else {
            if (location.hash) {
                currHash = location.hash.split('#')[1];
            } else {
                currHash = 'one';
            }

            $('#navigation li a[href="#' + currHash + '"]').addClass('selected');
        }

        $('#navigation li a:not([href="#' + currHash + '"])').removeClass('selected');
        $('#content-slider-inside li[id="' + currHash + '"]').stop().fadeIn(speed);
        $('#content-slider-inside li:not([id="' + currHash + '"])').stop().fadeOut(speed);

        /*if (history.pushState) {
            history.pushState(null, null, '#' + currHash);
        } else {
            location.hash = '#' + currHash;
        }*/

    }

    /*$(window).bind('hashchange', function () {
        doSwitch();
    });*/

    navLi.find('.selected').removeClass('selected');

    $('#navigation li a[href="#' + currHash + '"]').addClass('selected');

    navLinks.click(function (e) {
        doSwitch($(this));
        e.preventDefault();
    });

});