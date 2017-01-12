frontApp.controller("ImageController", ['$scope', '$http', '$window', function ($scope, $http, $window) {
    $scope.images = [];

    $http.get('/API/imageAPI/')
        .success(function (data) {
            $scope.images = data;
        })
}]);