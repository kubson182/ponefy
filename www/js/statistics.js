



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


$(".statistics-overview").append("<p>There is totally: "+ pocet +" comments</p>");
$(".statistics-overview").append("<p><span class='positive'>Positive:</span>  "+ p +" comments</p>");
$(".statistics-overview").append("<p><span class='negative'>Negative:</span>  "+ n +" comments</p>");
$(".statistics-overview").append("<p><span class='FYI'>FYIs:</span>  "+ f +" comments</p>");


$(".statistics-overview").append('<div class="progress" style="height:30px"><div class="progress-bar bg-success" style="width:' + pp + '%">'+ pp +'%</div><div class="progress-bar bg-danger" style="width:'+ nn +'%">'+ nn +'%</div><div class="progress-bar" style="width:'+ ff +'%">'+ ff +'%</div></div>');
// $(".statistics-dates").append('');


$(function() {
    $('input[name="daterange"]').daterangepicker({
      opens: 'left'
    }, function(start, end, label) {
      console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
    // console.log(start._d);
    var i = 1;
    while(i<comments.length){
        var ddd = comments[i][1];
            // console.log(ddd);
            // var komdate = ddd.substring(0,10);
            ddd = new Date(ddd);
        if(start._d <= ddd && end._d >= ddd){
            console.log("start date je skor alebo rovnako a end date je neskor alebo rovnako");
            console.log(start._d);
            console.log(ddd);
        }else{
            console.log("start date je neskor alebo end date je skor");

        }
        i++;
    }
    });
  });


document.addEventListener('deviceready', function() {
    window.sqlitePlugin.echoTest(function() {
      alert('ECHO test OK');
    });
  });




})