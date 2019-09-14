if (typeof (Storage) !== "undefined") {
    // Code for localStorage/sessionStorage.
    //console.log("local storage is supproted");

    var d = new Date();
    

    function post() {
        var mark = $("#mark").attr("value");
        var content = $("#content").val();
        var comments = [
            ["mark", "date", "content"]
        ]

        if (content.length < 1) {
            document.getElementById("error").innerHTML = "<span class='errormsg'>MUSIS ZADAT TEXT</span>";

            $('.errormsg').fadeOut(1500);
        } else {

            if (localStorage.id === undefined) {
                localStorage.id = 1;
                // console.log("bolo null");
                // console.log(parseInt(localStorage.id)); //vypise 1
                var id = parseInt(localStorage.id); //id = 1 ciselne
                var comment = [mark, new Date(), content];
                comments.push(comment); //do pola pridam aktualny comment
                localStorage.setItem("comments", JSON.stringify(comments));

                //increment id
                localStorage.id = id + 1;
            } else {

                var id = parseInt(localStorage.id); //do id priradi cislo z localstorage.id

                var comment = [mark, new Date(), content];

                var comments = JSON.parse(localStorage.getItem("comments"));
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

    } //koniec post()

} else {
    console.log("local storage not supproted");
    // Sorry! No Web Storage support..
}

function load() {
    
    var comments = JSON.parse(localStorage.getItem("comments"));
    if (comments === null) {
        console.log("ziadne komenty");

    } else {
        var pocet = comments.length;
        var i = 1;
        document.getElementById('komenty').innerHTML = "";
        while (i < pocet) {
            var ddd = comments[i][1];
            // console.log(ddd);
            // var komdate = ddd.substring(0,10);
            ddd = new Date(ddd);
            var month = ddd.getMonth() + 1;
            var day = ddd.getDate();
            var DateOutput = (day < 10 ? '0' : '') + day + "-" + (month < 10 ? '0' : '') + month + "-" + d.getFullYear();
            
            $("#komenty").prepend("<div hodnota='" + i + "' class='removebtn " + comments[i][0] + " " + i + "'><span><strong>Remove</strong></span></div><div hodnota='" + i + "' class='editbtn " + comments[i][0] + " " + i + "'><span><strong>Edit</strong></span></div><div id='" + i + "' class='comment " + comments[i][0] + " " + i + "'><span class='comment-date'>" + DateOutput + "</span><span class='comment-content'>" + comments[i][2] + "</span></div>");
            i++;
        }

        //swipe events for comments
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
    }

    $(".editbtn").click(function () {
        var comments = JSON.parse(localStorage.getItem("comments")); //do comments  priradi komenty z localstorage, vytvori pole
        var id = $(this).attr("hodnota");
        var comment = comments[id]; // vyberie aktualny comment zo vsetkych
        var mark = comment[0]; // aka je znacka commentu
        var content = comment[2]; // obsah commentu

        $("#content").val(content);
        $(".active").removeClass("active");
        $("#" + mark).addClass("active");
        $("#mark").attr("value", mark);
        $("#forma").addClass("disabled");
        $("#updateforma").removeClass("disabled");
        $("#cancelforma").removeClass("disabled");
        var i = comments.length - 1;
        console.log(id);
        while (i > 0) {
            if (i != id) {
                $("#" + i).removeClass("toedit");
                // console.log("nastava zmena ked i="+i)
            }
            // console.log(comments[i]);
            i--;
        }
        $(".editing").removeClass("editing");
        $("#" + id + ".comment").addClass("editing");
        window.scrollTo(0, 0);

    }); // end of click on editbtn

    $(".removebtn").click(function () {
        var comments = JSON.parse(localStorage.getItem("comments")); //do comments  priradi komenty z localstorage, vytvori pole
        var id = $(this).attr("hodnota");

        comments.splice(id, 1);
        console.log(comments)
        localStorage.setItem("comments", JSON.stringify(comments));

        $("." + id).css("opacity", "0");
        setTimeout(function () {
            $("." + id).hide();
        }, 500);

        setTimeout(function () {
            load();
        }, 800);

    });


} //end of load()

function update() {
    var id = $(".editing").attr("id");
    var comments = JSON.parse(localStorage.getItem("comments"));
    var mark = $("#mark").attr("value");
    var content = $("#content").val();
    var origindate = comments[id][1];
    var comment = [mark, origindate, content];
    comments.splice(id, 1, comment);
    localStorage.setItem("comments", JSON.stringify(comments));
    setTimeout(function () {
        load();
        $("#updateforma").addClass("disabled");
        $("#cancelforma").addClass("disabled");
        $("#forma").addClass("disabled");
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
    $(".editing").removeClass("editing");
    $("#updateforma").addClass("disabled");
    $("#cancelforma").addClass("disabled");
    $("#forma").addClass("disabled");

} //end of cancel


function filterP() {
    $(".n").fadeOut(600);
    $(".f").fadeOut(600);
    $(".p").fadeIn(900);
}

function filterN() {
    $(".p").fadeOut(600);
    $(".f").fadeOut(600);
    $(".n").fadeIn(900);
}

function filterF() {
    $(".p").fadeOut(600);
    $(".n").fadeOut(600);
    $(".f").fadeIn(900);
}

function filterOff() {
    $(".p").fadeIn(600);
    $(".n").fadeIn(600);
    $(".f").fadeIn(900);
}

$(document).ready(function () {
    //nacitat komenty
    load();

    // selecting value for mark, highlighting and enabling submit
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


});