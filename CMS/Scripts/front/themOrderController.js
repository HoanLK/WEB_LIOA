frontApp.controller("themOrderController", ['$scope', '$http', '$window', function ($scope, $http, $window) {
    $scope.order = {};
    $scope.idProduct = angular.element('#idProductCurrent').val();

    //INIT
    Init();

    //Lưu Order
    $scope.SaveOrder = function () {
        $scope.order.checked = 0;
        $http.post('/API/OrderAPI/', $scope.order)
        .success(function () {
            toastr.success('Thành công', 'Đặt hàng');
        })
        .error(function () {
            toastr.error('Thất bại', 'Đặt hàng');
        });
    }

    function Init() {
        $http.get('/API/ProductsAPI/' + $scope.idProduct)
            .success(function (product) {
                $scope.order.sanPham = product.title;
            })
    }
}]);