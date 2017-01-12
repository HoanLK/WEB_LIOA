/*Nút search*/
$("#button").click(function () {
    $("#search-box").show();
    $('#button').hide();
});
$(document).click(function (e) {
    if (!$(e.target).hasClass("button")
        && $(e.target).parents("#search-box").length === 0) {
        $("#search-box").hide();
        $('#button').show();
    }
});

/*Nút tìm kiếm trên di động*/
$("#search-btn").click(function () {
    console.log($("#search-box-mobile").is(":visible"));
    if (!$("#search-box-mobile").is(":visible")) {
        $("#search-box-mobile").slideToggle("medium");
        $("#dl-menu").css("border-bottom", "none");
    } else {
        $("#search-box-mobile").slideToggle("medium");
    }
});
$(document).click(function (e) {
    if (!$(e.target).hasClass("search-btn") && !$(e.target).hasClass("search-box-mobile")) {
        $("#search-box-mobile").slideUp("Medium");
    }
});