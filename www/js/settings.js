$(document).ready(function () {


    if (typeof (Storage) !== "undefined") {
        // Code for localStorage/sessionStorage.
        //console.log("local storage is supproted");
        localStorage.setItem("color","ff0000");
        var settings = JSON.parse(localStorage.getItem("settings"));

        if (settings === null) {
            //initial settings
            settings = [
                ["invert", "darktheme"]
            ];
            var invert = 0;
            var darktheme = 0;
            var setting = [invert, darktheme];
            settings.push(setting);
            localStorage.setItem("settings", JSON.stringify(settings));
        } else {
            var invert = settings[1][0];
            var darktheme = settings[1][1];
            console.log("invert setting: " + invert + ", darktheme: " + darktheme);

            // check the current settings and set the button
            if (darktheme == 1) {
                $("#darkthemeswitch").addClass("checked");
                $("#darkthemeswitcher").addClass("on");
                darkthemeon();
            } else {
                // do nothing
            }

            if (invert == 1) {
                $("#invertswitch").addClass("checked");
                $("#invertswitcher").addClass("on");
                inverton();
            } else {
                // do nothing
            }






            $("#invertswitch").click(function () {
                $("#invertswitch").toggleClass("checked");
                $("#invertswitcher").toggleClass("on");
                if ($("#invertswitcher").hasClass("on") == false) {
                    invertoff();
                } else {
                    inverton();
                }
            });


            $("#darkthemeswitch").click(function () {
                $("#darkthemeswitch").toggleClass("checked");
                $("#darkthemeswitcher").toggleClass("on");
                if ($("#darkthemeswitcher").hasClass("on") == false) {
                    darkthemeoff();
                } else {
                    darkthemeon();
                }
            });
        }

        //picking color for new tag
        
        $('#colorSelector').ColorPicker({
            color: '#ff0000',
            // flat: true,
            onShow: function (colpkr) {
                $(colpkr).fadeIn(500);
                return false;
            },
            onHide: function (colpkr) {
                $(colpkr).fadeOut(500);
                return false;
            },
            onChange: function (hsb, hex, rgb) {
                $('#colorSelector').css('backgroundColor', '#' + hex);
                // console.log(hex);
                localStorage.setItem("color",hex);
                $('#colorSelector').attr('value',hex);
                return false;
            },
            onSubmit: function (hex) {
                console.log(hex);
                var color = hex;
            }

        });
        
        



    } else {
        console.log("local storage not supproted");
        // Sorry! No Web Storage support..
    }

    


});




//function to turn on the dark theme  
function darkthemeon() {
    var settings = JSON.parse(localStorage.getItem("settings"));
    var darktheme = 1;
    var invert = settings[1][0];
    var setting = [invert, darktheme];
    settings[1] = setting;
    localStorage.setItem("settings", JSON.stringify(settings));
    console.log("on");
    console.log("invert setting: " + invert + ", darktheme: " + darktheme);
    $("#style").attr("href", "css/style-dark.css");
}

//function to turn off the dark theme
function darkthemeoff() {
    var settings = JSON.parse(localStorage.getItem("settings"));
    var darktheme = 0;
    var invert = settings[1][0];
    var setting = [invert, darktheme];
    settings[1] = setting;
    localStorage.setItem("settings", JSON.stringify(settings));
    console.log("off");
    console.log("invert setting: " + invert + ", darktheme: " + darktheme);
    $("#style").attr("href", "css/style.css");
}

function inverton() {
    var settings = JSON.parse(localStorage.getItem("settings"));
    var invert = 1;
    var darktheme = settings[1][1];
    var setting = [invert, darktheme];
    settings[1] = setting;
    localStorage.setItem("settings", JSON.stringify(settings));
    console.log("on");
    console.log("invert setting: " + invert + ", darktheme: " + darktheme);
    // $("#mainjs").attr("src","js/main2.js");
    document.body.appendChild(document.createElement('script')).src = 'js/main2.js';
}

function invertoff() {
    var settings = JSON.parse(localStorage.getItem("settings"));
    var invert = 0;
    var darktheme = settings[1][1];
    var setting = [invert, darktheme];
    settings[1] = setting;
    localStorage.setItem("settings", JSON.stringify(settings));
    console.log("off");
    console.log("invert setting: " + invert + ", darktheme: " + darktheme);
    // $("#mainjs").attr("src","js/main.js");
    document.body.appendChild(document.createElement('script')).src = 'js/main2.js';
}


function newTag (){
    var tagname = $("#tagname").val();
    var color = localStorage.getItem("color");
    // console.log(color);
    var tag = [tagname,color];

    var tags = JSON.parse(localStorage.getItem("tags"));

    if(tags == null){
        //if there are no tags
        
    }




    // localStorage.setItem("tags", JSON.stringify(tags));


}