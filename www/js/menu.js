$(document).ready(function () {
    // menu opening
    $(".nav-toggler").click(function () {
        $(".menuicon").toggleClass("change");
        $("#submenu").toggleClass("displayed");

    });


    $(".nav-toggler").focusout(function () {
        setTimeout(function () {
            $(".menuicon").removeClass("change");
            $("#submenu").removeClass("displayed");
        }, 100);
    });
});