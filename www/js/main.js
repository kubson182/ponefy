function post(){
    function comment(id, mark, date, content, tags) {
        this.id = id;
        this.mark = mark;
        this.date = date;
        this.content = content;
        this.tags = tags;
      }

    var mark = $("#mark").attr("value");
    var content = $("#content").val();
    var date = new Date();
    var comments = [];
    if (content.length < 1) {
        alert("You have to enter at least 1 character")
    } else {
        if (localStorage.id === undefined) {
            localStorage.id = 1;
            // console.log("bolo null");
            var id = parseInt(localStorage.id); //id = 1 ciselne

            var comment = new comment(id, mark, date, content, null);
            comments.push(comment); //do pola pridam aktualny comment
            localStorage.setItem("comments", JSON.stringify(comments));

            //increment id
            localStorage.id = id + 1;
        } else {

            var id = parseInt(localStorage.id); //do id priradi cislo z localstorage.id
            var comments = JSON.parse(localStorage.getItem("comments"));
            var comment = new comment(id, mark, date, content, null);
            comments.push(comment);
            localStorage.setItem("comments", JSON.stringify(comments));

            //increment id
            localStorage.id = id + 1;
        }
    }

    setTimeout(
        load(), 2000);

    $("#content").val('');
    $(".active").removeClass("active");
    $("#mark").attr("value", "");
    $("#forma").addClass("disabled");
    $("#cancelforma").addClass("disabled");
  } //end of post



  function load() {
    var settings = JSON.parse(localStorage.getItem("settings"));
    var invertsetting = settings[1][0];
    var comments = JSON.parse(localStorage.getItem("comments"));
    
    if (comments === null) {
        console.log("there are no comments");

    } else {
        var count = comments.length;
        var i = 0;
        document.getElementById('komenty').innerHTML = "";
        while (i < count) {
        var ddd = comments[i].date;
        // console.log(ddd);
        // var komdate = ddd.substring(0,10);
        ddd = new Date(ddd);
        var month = ddd.getMonth() + 1;
        var day = ddd.getDate();
        var DateOutput = (day < 10 ? '0' : '') + day + "-" + (month < 10 ? '0' : '') + month + "-" + ddd.getFullYear();
        
        if(invertsetting == 0){
          
        $("#komenty").prepend("<div id='"+ comments[i].id + "' class='removebtn " + comments[i].id + "' onclick='remove(this)'>Remove</div><div id='"+ comments[i].id + "' class='editbtn " + comments[i].id + "' onclick='edit(this)'>Edit</div><div id='" + comments[i].id + "' class='comment " + comments[i].id + " "+ comments[i].mark +"'><span class='comment-date'>" + DateOutput + "</span><div id='commenttags'></div><span class='comment-content'>" + comments[i].content + "</span></div>");
        }else{
            $("#komenty").prepend("<div id='"+ comments[i].id + "' class='removebtn2 " + comments[i].id + "' onclick='remove(this)'><span><strong>Remove</strong></span></div><div id='"+ comments[i].id + "' class='editbtn2 " + comments[i].id + "' onclick='edit(this)'>Edit</div><div id='" + comments[i].id + "' class='comment " + comments[i].id + " "+ comments[i].mark +"'><span class='comment-date'>" + DateOutput + "</span><div id='commenttags'></div><span class='comment-content'>" + comments[i].content + "</span></div>");   
        }
            
            i++;
        }



        //swipe events for comments
        if(invertsetting == 0){
        $(".comment").on("swiperight", function () {
            if ($(this).hasClass("todelete")) {
                //when it is already swiped right
                console.log("uz je vpravo");
            } else if ($(this).hasClass("toedit")) {
                $(this).removeClass("toedit");
                var id = $(this).attr("id");
                $("." + id).removeClass("show");
                $(this).removeClass("editing");
                $("#content").val("");
                $(".active").removeClass("active");
                $("#updateforma").addClass("disabled");
                $("#cancelforma").addClass("disabled");
                $("#tagsforma").addClass("disabled");
                $("#mark").attr("value", "");
            } else {
                $(this).addClass("todelete");
                var id = $(this).attr("id");
                $(".removebtn." + id).addClass("show");
            }
        });

        $(".comment").on("swipeleft", function () {
            // $(".toedit").removeClass("toedit");
            // $(".show").removeClass("show");

            if ($(this).hasClass("toedit")) {
                //when it is already swiped left
                console.log("uz je vlavo");
            } else if ($(this).hasClass("todelete")) {
                $(this).removeClass("todelete");
                var id = $(this).attr("id");
                $("." + id).removeClass("show"); //schovaj delete button

            } else {
                $(this).addClass("toedit");
                var id = $(this).attr("id");
                // console.log(id);
                $(".editbtn." + id).addClass("show");
            }
        });
    }else{
        $(".comment").on("swiperight", function () {
            if ($(this).hasClass("todelete")) {
                //when it is already swiped right
                console.log("uz je vpravo");
            } else if ($(this).hasClass("toedit")) {
                $(this).removeClass("toedit");
                var id = $(this).attr("id");
                $("." + id).removeClass("show");
                $(this).removeClass("editing");
                $("#content").val("");
                $(".active").removeClass("active");
                $("#updateforma").addClass("disabled");
                $("#cancelforma").addClass("disabled");
                $("#mark").attr("value", "");
            } else {
                $(this).addClass("todelete");
                var id = $(this).attr("id");
                $(".editbtn2." + id).addClass("show");
            }
        });

        $(".comment").on("swipeleft", function () {
            // $(".toedit").removeClass("toedit");
            // $(".show").removeClass("show");

            if ($(this).hasClass("toedit")) {
                //when it is already swiped left
                console.log("uz je vlavo");
            } else if ($(this).hasClass("todelete")) {
                $(this).removeClass("todelete");
                var id = $(this).attr("id");
                $("." + id).removeClass("show"); //schovaj delete button

            } else {
                $(this).addClass("toedit");
                var id = $(this).attr("id");
                // console.log(id);
                $(".removebtn2." + id).addClass("show");
            }
        });
    }
    }
} //end of load()



function edit(x) {
    var x = x;
    $(".editing").removeClass("editing");
    var comments = JSON.parse(localStorage.getItem("comments")); //do comments  priradi komenty z localstorage, vytvori pole
    var id = $(x).attr("id");
    console.log(id);
    for(i=0; i<comments.length; i++){
        if(comments[i].id == id){
            var comment = comments[i]; //najdi kde v poli sa nachadza prislusny comment
        }
    }

    var mark = comment.mark; // aka je znacka commentu
    var content = comment.content; // obsah commentu

    $("#content").val(content);
    $(".active").removeClass("active");
    $("#" + mark).addClass("active");
    $("#mark").attr("value", mark);
    $("#forma").addClass("disabled");
    $("#updateforma").removeClass("disabled");
    $("#cancelforma").removeClass("disabled");
    $("#tagsforma").removeClass("disabled");
    var i = comments.length - 1;
    // console.log(id);
    while (i > 0) {
        if (i != id) {
            $("#" + i).removeClass("toedit");
            // console.log("nastava zmena ked i="+i)
        }
        // console.log(comments[i]);
        i--;
    }
    
    $("#" + id + ".comment").addClass("editing");
    window.scrollTo(0, 0);


}


function remove(x) {
    var x = x;

    var comments = JSON.parse(localStorage.getItem("comments")); //do comments  priradi komenty z localstorage, vytvori pole
        var id = $(x).attr("id");

        for(i=0; i<comments.length; i++){
            if(comments[i].id == id){
                var index = i; //najdi kde v poli sa nachadza prislusny comment
            }
        }

        comments.splice(index, 1);
        console.log(comments)
        localStorage.setItem("comments", JSON.stringify(comments));

        $("#" + id).css("opacity", "0");
        setTimeout(function () {
            $("." + id).hide();
        }, 500);

        setTimeout(function () {
            load();
        }, 800);
}

function update() {
    var id = $(".editing").attr("id");
    var comments = JSON.parse(localStorage.getItem("comments"));
    var mark = $("#mark").attr("value");
    var content = $("#content").val();

    for(i=0; i<comments.length; i++){
        if(comments[i].id == id){
            var comment = comments[i]; //najdi kde v poli sa nachadza prislusny comment
            var index = i;
        }
    }

    // set new values for the comment
    comment.mark = mark;
    comment.content = content; 
    
    comments.splice(index, 1, comment);
    localStorage.setItem("comments", JSON.stringify(comments));

    setTimeout(function () {
        load();
        $("#updateforma").addClass("disabled");
        $("#cancelforma").addClass("disabled");
        $("#tagsforma").addClass("disabled");
        $("#forma").addClass("disabled");
        localStorage.removeItem("currenttags");
        $("#content").val("");
        $(".active").removeClass("active");
        $("#mark").attr("value", "");
    }, 300);

} //end of update()


function cancel() {
    $("#content").val("");
    $(".active").removeClass("active");
    $(".show").removeClass("show");
    $("#mark").attr("value", "");
    $(".toedit").removeClass("toedit");
    $(".todelete").removeClass("todelete");
    $(".editing").removeClass("editing");
    $("#updateforma").addClass("disabled");
    $("#cancelforma").addClass("disabled");
    $("#tagsforma").addClass("disabled");
    $("#forma").addClass("disabled");

} //end of cancel

function filterP(x) {
    var x = x;
    $(".filteroptions.active").removeClass("active");
    $(".filteroption.active").removeClass("active");
    $(".filtermarkthumb.active").removeClass("active");
    $(".filterp").addClass("active");
    $(x).addClass("active");
    $(".n").fadeOut(600);
    $(".f").fadeOut(600);
    $(".p").fadeIn(900);
}

function filterN(x) {
    var x = x;
    $(".filteroptions.active").removeClass("active");
    $(".filteroption.active").removeClass("active");
    $(".filtermarkthumb.active").removeClass("active");
    $(".filtern").addClass("active");
    $(x).addClass("active");
    $(".p").fadeOut(600);
    $(".f").fadeOut(600);
    $(".n").fadeIn(900);
}

function filterF(x) {
    var x = x;
    $(".filteroptions.active").removeClass("active");
    $(".filteroption.active").removeClass("active");
    $(".filtermarkthumb.active").removeClass("active");
    $(".filterf").addClass("active");
    $(x).addClass("active");
    $(".p").fadeOut(600);
    $(".n").fadeOut(600);
    $(".f").fadeIn(900);
}

function filterOff(x) {
    var x = x;
    $(".filteroptions.active").removeClass("active");
    $(".filteroption.active").removeClass("active");
    $(".filtermarkthumb.active").removeClass("active");
    $(x).addClass("active");
    $(".p").fadeIn(600);
    $(".n").fadeIn(600);
    $(".f").fadeIn(900);
}


var currentversion = "1.0.20190928";

function releaseNotes() {
    var div = document.createElement('div');
    div.innerHTML = `<div class="modal" tabindex="-1" role="dialog" id="releasenotesmodal">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Release notes</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body" id="releaseNotes"> 
        <p>Hello there! </p>
        <p>What's new in this version ${currentversion} :</p>
        <ul>
          <li>As you can see, the release notes are displaying when the app is updated (also available to open from settings)</li>
          <li>If you get popup with message "database updated", it means that the structure of how your data are stored has changed from arrays of arrays to arrays of objects. Nothing you have to worry about. It will just make my next updates easier to code ;)</li>
          <li>Filters were moved from menu to main page, so the menu is consistent on all pages</li>
          <li>You can now use the app offline</li>
          <li>Small design improvements</li>
          
        </ul>
    
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>`;
    
    

    $("#rn").append(div);
    $('#releasenotesmodal').modal('show');
}


$(document).ready(function () {
    

    if(localStorage.getItem("version") != currentversion){
        releaseNotes();
        localStorage.setItem("version",currentversion);
    }


    function transform(id, mark, date, content, tags) {
        this.id = id;
        this.mark = mark;
        this.date = date;
        this.content = content;
        this.tags = tags;
      }

    var comments = JSON.parse(localStorage.getItem("comments"));
    // localStorage.getItem("transformed");

    if(comments === null){
        load();
        console.log("ziadne predchadzajuce commenty, niet co transformovat");
        // localStorage.setItem("transformed", true);
    }
    else if(comments[0][0] === undefined){
        load();
        console.log("pvy koment uz je objekt, niet uz co transformovat");
        // localStorage.setItem("transformed", true);
    }else{
        for(i=1;i<comments.length;i++){
            var transformed = new transform(i,comments[i][0], comments[i][1], comments[i][2], null);
            comments.splice(i,1,transformed);
            
        }
        comments.splice(0,1);
        localStorage.setItem("comments", JSON.stringify(comments));
        alert("database updated");
        load();

    }

    $(".selection").click(function () {
        var content = $("#content").val();
        $(".active").removeClass("active");
        $(this).addClass("active");
        // console.log($(this).attr('id'));
        $("#mark").attr("value", $(this).attr("id"));
        if ($(".editing")[0]) {
            $("#cancelforma").removeClass("disabled");
        } else {
            $("#forma").removeClass("disabled");
            $("#cancelforma").removeClass("disabled");
        }
    });

    
})