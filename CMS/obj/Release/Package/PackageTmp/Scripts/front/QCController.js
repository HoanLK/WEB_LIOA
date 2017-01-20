frontApp.controller("QCController", ['$scope', '$http', '$window', function ($scope, $http, $window) {
    $scope.QCLeft = {};
    $scope.QCRight = {};

    $http.get('/API/QCAPI/1')
        .success(function (data) {
            $scope.QCLeft = data;
        })

    $http.get('/API/QCAPI/2')
    .success(function (data) {
        $scope.QCRight = data;
    })
}]);