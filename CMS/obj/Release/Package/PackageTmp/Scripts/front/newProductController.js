frontApp.controller("newProductController", ['$scope', '$http', '$window', 'CategoryProduct', function ($scope, $http, $window, CategoryProduct) {
    $scope.spMois = [];

    //Sản phẩm mới
    $http.get('/API/ProductsAPI?att=spMoi&&value=' + 0)
    .success(function (products) {
        $scope.spMoi = products;
    });
}]);