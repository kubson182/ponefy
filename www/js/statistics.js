$(document).ready(function () {
    var comments = JSON.parse(localStorage.getItem("comments"));
    var pocet = comments.length - 1;

    //get date of the first comment for datepicker
    var firstdate = comments[1][1];
    firstdate = new Date(firstdate);
    var firstday = firstdate.getDate();
    var firstmonth = firstdate.getMonth() + 1;
    var firstyear = firstdate.getFullYear();
    var first = (firstmonth < 10 ? '0' : '') + firstmonth + "/" + (firstday < 10 ? '0' : '') + firstday + "/" + firstyear;
    //get date of the last comment for datepicker
    var lastdate = comments[comments.length - 1][1];
    lastdate = new Date(lastdate);
    var lastday = lastdate.getDate();
    var lastmonth = lastdate.getMonth() + 1;
    var lastyear = lastdate.getFullYear();
    var last = (lastmonth < 10 ? '0' : '') + lastmonth + "/" + (lastday < 10 ? '0' : '') + lastday + "/" + lastyear;

    $("#daterange").attr("value", first + " - " + last); //set the range of whole comments for datepicker

    var i = 1;
    var p = 0;
    var n = 0;
    var f = 0;



    while (i < comments.length) {
        if (comments[i][0] == "p") {
            p++;
            i++;
            // console.log("pridany pozitiv");
        } else if (comments[i][0] == "n") {
            n++;
            i++;
            // console.log("pridany negativ");
        } else {
            f++;
            i++;
            // console.log("pridany FYI");
        }

    }

    // get % for each amount of comment
    var pp = Math.round((100 / pocet) * p);
    var nn = Math.round((100 / pocet) * n);
    var ff = Math.round((100 / pocet) * f);

    $(".statistics-overview").append("<p>There is totally: " + pocet + " comments</p>");
    $(".statistics-overview").append("<p><span class='positive'>Positive:</span>  " + p + " comments</p>");
    $(".statistics-overview").append("<p><span class='negative'>Negative:</span>  " + n + " comments</p>");
    $(".statistics-overview").append("<p><span class='FYI'>FYIs:</span>  " + f + " comments</p>");
    $(".statistics-overview").append('<div class="progress" style="height:30px"><div class="progress-bar bg-success" style="width:' + pp + '%">' + pp + '%</div><div class="progress-bar bg-danger" style="width:' + nn + '%">' + nn + '%</div><div class="progress-bar" style="width:' + ff + '%">' + ff + '%</div></div>');


    //function display information for selected date range
    $(function () {
        $('input[name="daterange"]').daterangepicker({
            opens: 'left'
        }, function (start, end, label) {
            console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
            console.log(start._d);
            var i = 1;
            var pocet = 0;
            var p = 0;
            var n = 0;
            var f = 0;
            while (i < comments.length) {
                var ddd = comments[i][1];
                // console.log(ddd);
                // var komdate = ddd.substring(0,10);
                ddd = new Date(ddd);
                if (start._d <= ddd && end._d >= ddd) {
                    console.log("start date je skor alebo rovnako a end date je neskor alebo rovnako");
                    // console.log(start._d);
                    // console.log(ddd);

                    if (comments[i][0] == "p") {
                        p++;
                        pocet++;
                    } else if (comments[i][0] == "n") {
                        n++;
                        pocet++;
                    } else {
                        f++;
                        pocet++;
                    }
                } else {
                    console.log("start date je neskor alebo end date je skor");
                }
                i++;
            }

            var pp = Math.round((100 / pocet) * p);
            var nn = Math.round((100 / pocet) * n);
            var ff = Math.round((100 / pocet) * f);

            $(".statistics-overview").html("");
            $(".statistics-overview").append("<p>For the selected range there is totally: " + pocet + " comments</p>");
            $(".statistics-overview").append("<p><span class='positive'>Positive:</span>  " + p + " comments</p>");
            $(".statistics-overview").append("<p><span class='negative'>Negative:</span>  " + n + " comments</p>");
            $(".statistics-overview").append("<p><span class='FYI'>FYIs:</span>  " + f + " comments</p>");
            $(".statistics-overview").append('<div class="progress" style="height:30px"><div class="progress-bar bg-success" style="width:' + pp + '%">' + pp + '%</div><div class="progress-bar bg-danger" style="width:' + nn + '%">' + nn + '%</div><div class="progress-bar" style="width:' + ff + '%">' + ff + '%</div></div>');

        });
    });

})