/*Hiển thị chữ trên banner*/
$(document).ready(function () {
    $('#text').fadeIn(700);
});
/*Hiện dần từng thành phần trong trang*/
$(function () {
    if ($(window).width() > 991) {
        $(document).ready(function () {
            var toggled = false;
            $(window).scroll(function () {
                $('#prod, #vis').each(function (i) {
                    var top_of_object = $(this).offset().top + 50;
                    var bottom_of_window = $(window).scrollTop() + $(window).height();
                    if (bottom_of_window > top_of_object) {
                        if (toggled == false) {
                            $('#vis').toggle("slide", { direction: "right" }, 1200);
                            var i = 1;
                            myLoop();
                            function myLoop() {
                                setTimeout(function () {
                                    $('#prod-' + i).toggle("slide", { direction: "left" }, 700);
                                    i++;
                                    if (i < 5) {
                                        myLoop();
                                    }
                                }, 500)
                            }
                            toggled = true
                        }
                    }
                });

                $('#sui').each(function (i) {
                    var top_of_object = $(this).offset().top + 50;
                    var bottom_of_window = $(window).scrollTop() + $(window).height();
                    if (bottom_of_window > top_of_object) {
                        $('#sui').animate({ 'opacity': '1' }, 1000);
                    }
                });

                $('#news').each(function (j) {
                    var top_of_object = $(this).offset().top + 50;
                    var bottom_of_window = $(window).scrollTop() + $(window).height();
                    if (bottom_of_window > top_of_object) {
                        $('#news').animate({ 'opacity': '1' }, 1000);
                    }
                });
            });
        });
    }
});


//$(document).ready(function () {
//    var toggled = false;
//    $(window).scroll(function () {
//        $('#prod, #vis').each(function (i) {
//            var top_of_object = $(this).offset().top + 50;
//            var bottom_of_window = $(window).scrollTop() + $(window).height();
//            if (bottom_of_window > top_of_object) {
//                if (toggled == false) {
//                    $('#vis').toggle("slide", { direction: "right" }, 1200);
//                    var i = 1;
//                    myLoop();
//                    function myLoop() {
//                        setTimeout(function () {
//                            $('#prod-' + i).toggle("slide", { direction: "left" }, 700);
//                            i++;
//                            if (i < 5) {
//                                myLoop();
//                            }
//                        }, 500)
//                    }
//                    toggled = true
//                }
//            }
//        });

//        $('#sui').each(function (i) {
//            var top_of_object = $(this).offset().top + 50;
//            var bottom_of_window = $(window).scrollTop() + $(window).height();
//            if (bottom_of_window > top_of_object) {
//                $('#sui').animate({ 'opacity': '1' }, 1000);
//            }
//        });

//        $('#news').each(function (j) {
//            var top_of_object = $(this).offset().top + 50;
//            var bottom_of_window = $(window).scrollTop() + $(window).height();
//            if (bottom_of_window > top_of_object) {
//                $('#news').animate({ 'opacity': '1' }, 1000);
//            }
//        });
//    });
//});

/*Slide công trình tiêu biểu*/
$(document).ready(function () {
    $('#myCarousel').carousel({
        interval: 10000
    })
    $('#myCarousel').on('slid.bs.carousel', function () { });
});