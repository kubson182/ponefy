    function lightOrDark(color) {
    
        // Variables for red, green, blue values
        var r, g, b, hsp;
        
        // Check the format of the color, HEX or RGB?
        if (color.match(/^rgb/)) {
    
            // If HEX --> store the red, green, blue values in separate variables
            color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
            
            r = color[1];
            g = color[2];
            b = color[3];
        } 
        else {
            
            // If RGB --> Convert it to HEX: http://gist.github.com/983661
            color = +("0x" + color.slice(1).replace( 
            color.length < 5 && /./g, '$&$&'));
    
            r = color >> 16;
            g = color >> 8 & 255;
            b = color & 255;
        }
        
        // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
        hsp = Math.sqrt(
        0.299 * (r * r) +
        0.587 * (g * g) +
        0.114 * (b * b)
        );
    
        // Using the HSP value, determine whether the color is light or dark
        if (hsp>127.5) {
            
            return 'light';
        } 
        else {
            
            return 'dark';
        }
    }
    


    
    
    function newTag (){
        var tagname = $("#tagname").val();
        var color = localStorage.getItem("color");
        var tagid = JSON.parse(localStorage.getItem("tagid"));

        if(tagid === null){
            tagid = 1;
            localStorage.setItem("tagid",tagid);
        }else{
            tagid++;
            localStorage.setItem("tagid",tagid);
        }

        // console.log(color);
        var tag = [tagid,tagname,color];
    
        var tags = JSON.parse(localStorage.getItem("tags"));
        // console.log(tags);
        
            tags.push(tag);
            localStorage.setItem("tags", JSON.stringify(tags));
            // console.log("tag pridany");
        
        $("#tagname").val("");
        taglist();
    }

    function updatetag(){
        var tags = JSON.parse(localStorage.getItem("tags"));
        var tagname = $("#tagname").val();
        var color = localStorage.getItem("color");
        var tag = [tagname,color];
        var id = $(".editingtag").attr("id");
        tags[id] = tag;
        localStorage.setItem("tags", JSON.stringify(tags));
        $("#tagname").val("");
        $(".editingtag").removeClass("editingtag");
        $(".updatetagbtn").html("Add Tag");
        $(".updatetagbtn").addClass("newtagbtn");
        $(".newtagbtn").removeClass("updatetagbtn");
        $(".newtagbtn").attr("onclick","newTag()");
        taglist();
    }
    


function taglist(){
    var tags = JSON.parse(localStorage.getItem("tags"));

    if(tags === null){
        var tags = [["tagid","tagname","color"]];
        localStorage.setItem("tags", JSON.stringify(tags));
        // console.log("prvy tag pridany");
    }else{

    var i = 1;
    $("#taglist").html("");
    while(i < tags.length){

        //dark or light?
       var color = tags[i][1]; 
        
        $("#taglist").prepend('<div class="row" poradie="'+ i +'"><div class="col-6"><div class="tag-settings '+ lightOrDark(color) +' " poradie="'+ i +'" style="background-color: #'+ tags[i][2] +'"><div>'+ tags[i][1] +'</div></div></div><div class="col-3"><div class="tageditbtn tag-settings" poradie="'+ i +'">edit</div></div><div class="col-3"><div class="tagremovebtn tag-settings" poradie="'+ i +'">remove</div></div></div>');
        i++;
    }

    $(".tagremovebtn").click(function () {
        var tags = JSON.parse(localStorage.getItem("tags")); //do comments  priradi komenty z localstorage, vytvori pole
        var poradie = $(this).attr("poradie");
        // console.log(id);
        tags.splice(poradie, 1);
        localStorage.setItem("tags", JSON.stringify(tags));
    
        setTimeout(function () {
            taglist();
        }, 500);
    
    });


    $(".tageditbtn").click(function () {
        var tags = JSON.parse(localStorage.getItem("tags")); //do comments  priradi komenty z localstorage, vytvori pole
        var poradie = $(this).attr("poradie");
        // console.log(id);
        var tagname = tags[poradie][1];
        $("#tagname").val(tagname);
        $(".newtagbtn").html("update");
        $(".newtagbtn").addClass("updatetagbtn");
        $(".newtagbtn").removeClass("newtagbtn");
        $(".updatetagbtn").attr("onclick","updatetag()");
        $(".editingtag").removeClass("editingtag");
        $(".row#"+poradie).addClass("editingtag");


        localStorage.setItem("tags", JSON.stringify(tags));
    
        // setTimeout(function () {
        //     taglist();
        // }, 500);
    
    });

}

}










$(document).ready(function () {

    localStorage.setItem("color","ff0000");
    var settings = JSON.parse(localStorage.getItem("settings"));

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
    }

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





        function darkthemeon() {
            var settings = JSON.parse(localStorage.getItem("settings"));
            var darktheme = 1;
            var invert = settings[1][0];
            var setting = [invert, darktheme];
            settings[1] = setting;
            localStorage.setItem("settings", JSON.stringify(settings));
            // console.log("on");
            // console.log("invert setting: " + invert + ", darktheme: " + darktheme);
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
            // console.log("off");
            // console.log("invert setting: " + invert + ", darktheme: " + darktheme);
            $("#style").attr("href", "css/style.css");
        }
        
        function inverton() {
            var settings = JSON.parse(localStorage.getItem("settings"));
            var invert = 1;
            var darktheme = settings[1][1];
            var setting = [invert, darktheme];
            settings[1] = setting;
            localStorage.setItem("settings", JSON.stringify(settings));
            // console.log("on");
            // console.log("invert setting: " + invert + ", darktheme: " + darktheme);
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
            // console.log("off");
            // console.log("invert setting: " + invert + ", darktheme: " + darktheme);
            // $("#mainjs").attr("src","js/main.js");
            document.body.appendChild(document.createElement('script')).src = 'js/main2.js';
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
    





    taglist();

     

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
            // console.log(hex);
            var color = hex;
        }


    });
   



    


});
