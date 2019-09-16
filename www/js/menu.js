$(document).ready(function () {
    // menu opening
    $('body').click(function(e) {
        if($(event.target).is('.notclose')){
            //do nothing
        }else if($(event.target).is('.nav-toggler')){
            $(".menuicon").toggleClass("change");
            $("#submenu").toggleClass("displayed");
        }else if($(event.target).is('.menuicon')){
            $(".menuicon").toggleClass("change");
            $("#submenu").toggleClass("displayed");
        }else if($(event.target).is('.bar')){
            $(".menuicon").toggleClass("change");
            $("#submenu").toggleClass("displayed");
        }else{
            $(".menuicon").removeClass("change");
            $("#submenu").removeClass("displayed");
        }

    
    });



    
    //submenu for filters
    $("#menu-filters").click(function () {
        $(".flaticon-right-arrow").toggleClass("rotated");
        $(".submenu-filters").toggleClass("opened");
        $("#menu-statistics").toggleClass("opened");
        $(".menuicon").addClass("change");
            $("#submenu").addClass("displayed");
    });
});