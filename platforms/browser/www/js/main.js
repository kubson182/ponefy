function loadpositives(){
    var ajax = new XMLHttpRequest();
    // console.log("nieco sa deje");

    ajax.open("POST", "http://kubsons-app.byethost8.com/load-positives.php");
    ajax.send();

    ajax.addEventListener("load", completeHandlerrrr, false);
    function completeHandlerrrr(event){
        var hh= event.target.responseText; 

        document.getElementById("putHere").innerHTML = hh;
    }
}

function loadnegatives(){
    var ajax = new XMLHttpRequest();
    // console.log("nieco sa deje");

    ajax.open("POST", "http://kubsons-app.byethost8.com/load-negatives.php");
    ajax.send();

    ajax.addEventListener("load", completeHandlerrrr, false);
    function completeHandlerrrr(event){
        var hh= event.target.responseText; 

        document.getElementById("putHere").innerHTML = hh;
    }
}

function loadfyi(){
    var ajax = new XMLHttpRequest();
    // console.log("nieco sa deje");

    ajax.open("POST", "http://kubsons-app.byethost8.com/load-fyi.php");
    ajax.send();

    ajax.addEventListener("load", completeHandlerrrr, false);
    function completeHandlerrrr(event){
        var hh= event.target.responseText; 

        document.getElementById("putHere").innerHTML = hh;
    }
}


//postovanie cez submit.php

function post(){
    var mark = document.getElementById("mark").value; 
    var content = document.getElementById("content").value;

    // console.log(mark);
    // console.log(content);

    var formdata = new FormData();
    formdata.append("mark", mark);
    formdata.append("content", content);

    var ajax = new XMLHttpRequest();
document.getElementById('ans').innerHTML = 'Loading...';
ajax.addEventListener("load", completeHandlerrrr, false);

ajax.open("POST", "http://kubsons-app.byethost8.com/submit.php");
ajax.send(formdata);
}

function completeHandlerrrr(event){

    var hh= event.target.responseText; 
    
        document.getElementById('ans').innerHTML = hh; 
        $("#content").val('');
        
        setTimeout(
            function() 
            {
              $('#ans').fadeOut(600);
              
            }, 2000);

            setTimeout( 
                function(){
                    document.getElementById('ans').innerHTML = "";
                    $("#ans").attr("style", "display: inline");
                }, 2700);
    }

    

    



$(document).ready(function(){

// menu opening
    $(".nav-toggler").click(function(){
        $(".menuicon").toggleClass("change");
        $("#submenu").toggleClass("displayed");
        
    });

// selecting value for mark, highlighting and enabling submit
$(".selection").click(function(){
    $(".active").removeClass("active");
    $(this).addClass("active");
    // console.log($(this).attr('id'));
    $("#mark").attr("value", $(this).attr("id"))
    $(".formBtn").removeAttr("disabled", "disabled");
});




});