/*Nút chuyển ở danh mục ngang banner*/
$(function () {

    /*Chuyển xuống danh sách sản phẩm*/
    $("#next-to-danhsachsanpham").click(function () {
        $('html, body').animate({
            scrollTop: $('#danhsachsanpham').offset().top
        }, 500);
    });

    /*Chuyển xuống bộ sưu tập ảnh*/
    $("#next-to-bosuutap").click(function () {
        $('html, body').animate({
            scrollTop: $('#bosuutap').offset().top
        }, 500);
    });

    /*Chuyển xuống bản đồ*/
    $("#next-to-bando").click(function () {
        $('html, body').animate({
            scrollTop: $('#bando').offset().top
        }, 500);
    });

    /*Chuyển xuống liên hệ*/
    $("#next-to-lienhe").click(function () {
        $('html, body').animate({
            scrollTop: $('#lienhe').offset().top
        }, 500);
    });
});

/*Bộ sưu tập*/
$(document).ready(function () {
    $(".sub").click(function (index, element) {
        console.log($(this));
        if ($(this).attr("id") != null) {
            $("#main").css("display", "none");
            var srcCurrent = $(this).find("img").attr("src");
            $("#main").attr("src", srcCurrent);
            $("#main").toggle("slide", { direction: "right" }, 500);
        }
    });
});