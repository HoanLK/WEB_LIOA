frontApp.factory('CategoryProduct', function () {
    var fac = {};

    var table = [];
    var array = [];

    //Table Menu
    function tableMultiLevel(input, level) {

        for (var h = 0; h < input.length; h++) {
            if (input[h].idCategoryProduct) {

                var output = {};
                var preName = '';
                for (var j = 0; j < level; j++) {
                    preName += '- ';
                }
                output.idCategoryProduct = input[h].idCategoryProduct;
                output.idCategoryProductParent = input[h].idCategoryProductParent;
                output.title = preName + input[h].title;
                output.alias = input[h].alias;
                if (input[h].published == 0) {
                    output.published = "Chưa xuất bản";
                } else {
                    output.published = "Đã xuất bản";
                }
                output.note = input[h].note;
                table.push(output);

                if (input[h].CategoryProduct1.length > 0) {
                    tableMultiLevel(input[h].CategoryProduct1, level + 1);
                }

            }
        }

    };
    fac.getTable = function (list) {
        
        tableMultiLevel(list, 0);
        
        var output = table;
        table = [];
        return output;
    };

    //Array
    function allCategoryProduct(input) {

        for (var h = 0; h < input.length; h++) {
            if (input[h].idCategoryProduct) {

                var output = {};
                output.idCategoryProduct = input[h].idCategoryProduct;
                output.idCategoryProductParent = input[h].idCategoryProductParent;
                output.title = input[h].title;
                output.alias = input[h].alias;
                output.note = input[h].note;
                output.image = input[h].image;
                output.description = input[h].description;
                array.push(output);

                if (input[h].CategoryProduct1.length > 0) {
                    allCategoryProduct(input[h].CategoryProduct1);
                }

            }
        }

    };
    fac.getallCategoryProduct = function (list) {

        allCategoryProduct(list);

        var output = array;
        array = [];
        return output;
    };

    return fac;
});