$(document).ready(function () {


    if (typeof (Storage) !== "undefined") {
        // Code for localStorage/sessionStorage.
        //console.log("local storage is supproted");
    
        var settings = JSON.parse(localStorage.getItem("settings"));

        if(settings === null){
            settings = [["invert","darktheme"]];
            var invert = 0;
            var darktheme = 0;
            var setting = [invert,darktheme];
            settings.push(setting);
            localStorage.setItem("settings", JSON.stringify(settings));
        }else{
            var invert = settings[1][0];
            var darktheme = settings[1][1];
            console.log("invert setting: " + invert +", darktheme: "+ darktheme);

            //check if darktheme is selected, if yes, set the switch to checked
            if (darktheme == 1){
                console.log("mal by byt selectnuty darktheme switch");
                $("#darkthemeswitch").prop("checked",true);
                $("#style").attr("href","css/style-dark.css");
                //on click  turn off
                $("#darkthemeswitch").on("click",function (){
                    darkthemeoff();
                });
            }else{
                //on click  turn on
                $("#darkthemeswitch").on("click",function (){
                    darkthemeon();
                    
                });
            }



            if(invert == 1){
                console.log("mal by byt selectnuty invert switch");
                $("#invertswitch").prop("checked",true);
                //on click  turn off
                $("#invertswitch").on("click",function (){
                    invertoff();
                });
            }else{
                //on click  turn on
                $("#invertswitch").on("click",function (){
                    inverton();
                });
            }
        }

        //function to turn on the dark theme  
        function darkthemeon(){
            var darktheme = 1;
            var setting = [invert,darktheme];
            settings[1] = setting;
            localStorage.setItem("settings", JSON.stringify(settings));
            console.log("on");
            console.log("invert setting: " + invert +", darktheme: "+ darktheme);
            $("#style").attr("href","css/style-dark.css");
        }

        //function to turn off the dark theme
        function darkthemeoff(){
            var darktheme = 0;
            var setting = [invert,darktheme];
            settings[1] = setting;
            localStorage.setItem("settings", JSON.stringify(settings));
            console.log("off");
            console.log("invert setting: " + invert +", darktheme: "+ darktheme);
            $("#style").attr("href","css/style.css");
        }

        function inverton(){
            var invert = 1;
            var setting = [invert, darktheme];
            settings[1] = setting;
            localStorage.setItem("settings", JSON.stringify(settings));
            console.log("on");
            console.log("invert setting: " + invert +", darktheme: "+ darktheme);
        }
        function invertoff(){
            var invert = 0;
            var setting = [invert, darktheme];
            settings[1] = setting;
            localStorage.setItem("settings", JSON.stringify(settings));
            console.log("off");
            console.log("invert setting: " + invert +", darktheme: "+ darktheme);
        }
        
    
    } else {
        console.log("local storage not supproted");
        // Sorry! No Web Storage support..
    }


    

});