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
    console.log(pp);
    var nn = Math.round((100/pocet)*n);
    console.log(nn);
    var ff = Math.round((100/pocet)*f);
    console.log(ff);


    // console.log("pocet pozitivnych komentarov je: " + p);
    // console.log("pocet negativnych komentarov je: " + n);
    // console.log("pocet FYI komentarov je: " + f);
$(".statistics-overview").append("<p>There is totally: "+ pocet +" comments</p>");
$(".statistics-overview").append("<p><span class='positive'>Positive:</span>  "+ p +" comments</p>");
$(".statistics-overview").append("<p><span class='negative'>Negative:</span>  "+ n +" comments</p>");
$(".statistics-overview").append("<p><span class='FYI'>FYIs:</span>  "+ f +" comments</p>");


$(".statistics-overview").append('<div class="progress" style="height:30px"><div class="progress-bar bg-success" style="width:' + pp + '%">'+ pp +'%</div><div class="progress-bar bg-danger" style="width:'+ nn +'%">'+ nn +'%</div><div class="progress-bar" style="width:'+ ff +'%">'+ ff +'%</div></div>');
// $(".statistics-dates").append('');

})