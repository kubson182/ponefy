



$(document).ready(function () {
    var comments = JSON.parse(localStorage.getItem("comments"));
    var pocet = comments.length - 1;
    var i = 1;
    var p = 0;
    var n = 0;
    var f = 0;

    while (i<comments.length){
        if(comments[i][0]=="p"){
            p++;
            i++;
            // console.log("pridany pozitiv");
        }else if(comments[i][0]=="n"){
            n++;
            i++;
            // console.log("pridany negativ");
        }else{
            f++;
            i++;
            // console.log("pridany FYI");
        }
    
    }

    var pp = Math.round((100/pocet)*p);
    // console.log(pp);
    var nn = Math.round((100/pocet)*n);
    // console.log(nn);
    var ff = Math.round((100/pocet)*f);
    // console.log(ff);


    // console.log("pocet pozitivnych komentarov je: " + p);
    // console.log("pocet negativnych komentarov je: " + n);
    // console.log("pocet FYI komentarov je: " + f);
$(".statistics-overview").append("<p>There is totally: "+ pocet +" comments</p>");
$(".statistics-overview").append("<p><span class='positive'>Positive:</span>  "+ p +" comments</p>");
$(".statistics-overview").append("<p><span class='negative'>Negative:</span>  "+ n +" comments</p>");
$(".statistics-overview").append("<p><span class='FYI'>FYIs:</span>  "+ f +" comments</p>");


$(".statistics-overview").append('<div class="progress" style="height:30px"><div class="progress-bar bg-success" style="width:' + pp + '%">'+ pp +'%</div><div class="progress-bar bg-danger" style="width:'+ nn +'%">'+ nn +'%</div><div class="progress-bar" style="width:'+ ff +'%">'+ ff +'%</div></div>');
// $(".statistics-dates").append('');



// var d = new Date();
// console.log(d);
    // var month = d.getMonth() + 1;
    // console.log(month);
    // var day = d.getDate()-7;
    // console.log(day);
    // var pastDate = d.getDate() - 7;
    // console.log(pastDate);

    // var DateOutput = (day < 10 ? '0' : '') + day + "-" + (month < 10 ? '0' : '') + month + "-" + d.getFullYear();

// console.log(DateOutput);

var ourDate = new Date();
var ourday = ourDate.getDate();
var ourmonth = ourDate.getMonth();
var lastweek = new Date();
//Change it so that it is 7 days in the past.
var pastDate = ourDate.getDate() - 7;

lastweek.setDate(pastDate);



var ourDateOut = (ourday < 10 ? '0' : '') + ourday + "-" + (ourmonth < 10 ? '0' : '') + ourmonth + "-" + ourDate.getFullYear();
console.log(ourDateOut);
var lastDateOut = (lastweek.getDate() < 10 ? '0' : '') + lastweek.getDate() + "-" + (lastweek.getMonth() < 10 ? '0' : '') + lastweek.getMonth() + "-" + lastweek.getFullYear();
console.log(lastDateOut);

var rnDate = "29-07-2019";

var rozdiel = ourDateOut-rnDate;

console.log(rozdiel);

//Log the date to our web console.



})