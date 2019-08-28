if (typeof(Storage) !== "undefined") {
    // Code for localStorage/sessionStorage.
    //console.log("local storage is supproted");


    var d = new Date();
    var month = d.getMonth()+1;
    var day = d.getDate();
    var DateOutput  = (day<10 ? '0' : '') + day + "-" + (month<10 ? '0' : '') + month + "-" + d.getFullYear();

        



    function post(){
        var mark = $("#mark").attr("value");
        var content = $("#content").val();
        var comments = [
            ["id","mark","content"]
        ]
        

        if(content.length < 1){
            document.getElementById("error").innerHTML = "<span class='errormsg'>MUSIS ZADAT TEXT</span>";
            
                $('.errormsg').fadeOut(1500);
        }else{

if(localStorage.id === undefined){
    localStorage.id = 1;
    console.log("bolo null");
    console.log(parseInt(localStorage.id));  //vypise 1
    var id = parseInt(localStorage.id); //id = 1 ciselne
    var comment = [id,mark,DateOutput,content];
    comments.push(comment); //do pola pridam aktualny comment
localStorage.setItem("comments", JSON.stringify(comments));

    //increment id
    localStorage.id = id+1;
}else{
    
    var id = parseInt(localStorage.id); //do id priradi cislo z localstorage.id

    var comment = [id,mark,DateOutput,content];

    var comments = JSON.parse(localStorage.getItem("comments"));
    comments.push(comment);
    localStorage.setItem("comments", JSON.stringify(comments));
   
    //increment id
    localStorage.id = id+1;
}}
        

                setTimeout( 
                    load(), 3000);
                
                    $("#content").val('');
} //koniec post()


  } else {
      console.log("local storage not supproted");
    // Sorry! No Web Storage support..
  }




  function load(){
    var comments = JSON.parse(localStorage.getItem("comments"));
    if (comments === null){
        console.log("ziadne komenty");
        
    }else{
    
    
    
    var pocet = comments.length;
    var i = 1;
    document.getElementById('komenty').innerHTML = "";
     while (i<pocet){
        $("#komenty").prepend("<div class='comment "+ comments[i][1] +"'><span class='comment-date'>" + comments[i][2] + "</span><span class='comment-content'>" + comments[i][3] + "</span></div>");  

        
         
         i++;
     }



//swipe events for comments
$( ".comment" ).on( "swiperight", function(){
    if($(this).hasClass("todelete")){
//when it is already swiped right
console.log("uz je vpravo");
    }else if ($(this).hasClass("toedit")){
        $(this).removeClass("toedit");
    }else{
    $(this).addClass("todelete");
    }
});

$( ".comment" ).on( "swipeleft", function(){
    if($(this).hasClass("toedit")){
//when it is already swiped left
console.log("uz je vlavo");
    }else if ($(this).hasClass("todelete")){
        $(this).removeClass("todelete");
    }else{
    $(this).addClass("toedit");
    }
});


    }


  
  }


function filterP(){ 
    $(".n").fadeOut(600);
    $(".f").fadeOut(600);
    
    $(".p").fadeIn(900);
}

function filterN(){ 
    $(".p").fadeOut(600);
    $(".f").fadeOut(600);
    $(".n").fadeIn(900); 
    }

    function filterF(){ 
        $(".p").fadeOut(600);
        $(".n").fadeOut(600);
        $(".f").fadeIn(900); 
        }

        function filterOff(){ 
            $(".p").fadeIn(600);
            $(".n").fadeIn(600);
            $(".f").fadeIn(900); 
            }










$(document).ready(function(){
//nacitat komenty
    load();

// menu opening
    $(".nav-toggler").click(function(){
        $(".menuicon").toggleClass("change");
        $("#submenu").toggleClass("displayed");
        
    });
    
    
    $(".nav-toggler").focusout(function(){
        setTimeout(function(){
        $(".menuicon").removeClass("change");
        $("#submenu").removeClass("displayed");
        }, 100);
    });


    


// selecting value for mark, highlighting and enabling submit
$(".selection").click(function(){
    var content = $("#content").val();
    $(".active").removeClass("active");
    $(this).addClass("active");
    // console.log($(this).attr('id'));
    $("#mark").attr("value", $(this).attr("id"));
    $("#forma").removeAttr("class", "disabled");
    
});




// //swipe events for comments
// $( ".comment" ).on( "swiperight", function(){
//     if($(this).hasClass("todelete")){
// //when it is already swiped right
// console.log("uz je vpravo");
//     }else if ($(this).hasClass("toedit")){
//         $(this).removeClass("toedit");
//     }else{
//     $(this).addClass("todelete");
//     }
// });

// $( ".comment" ).on( "swipeleft", function(){
//     if($(this).hasClass("toedit")){
// //when it is already swiped left
// console.log("uz je vlavo");
//     }else if ($(this).hasClass("todelete")){
//         $(this).removeClass("todelete");
//     }else{
//     $(this).addClass("toedit");
//     }
// });




});