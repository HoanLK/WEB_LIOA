frontApp.controller("categoryPostController", ['$scope', '$http', '$window', 'CategoryPost', function ($scope, $http, $window, CategoryPost) {
    $scope.categoryPosts = [];
    $scope.posts = [];
    $scope.idCategory = angular.element('#idCategory').val();
    $scope.idCategory = 2;
    $scope.tinMois = [];
    $scope.tinNoiBats = [];

    //Lấy tất cả danh mục
    $http.get('/API/CategoriesAPI/')
        .success(function (data) {
            var categories = CategoryPost.getallCategory(data);
            angular.forEach(categories, function (value, key) {
                if (value.idCategoryParent == '1') {
                    $scope.categoryPosts.push(value);
                }
            });
        })

    //Bài viết trong danh mục con
    $http.get('/API/PostsAPI?att=idCategory&&value=' + $scope.idCategory)
        .success(function (posts) {
            $scope.posts = posts;
        });

    //Tin mới
    $http.get('/API/PostsAPI?att=idCategoryMoi&&value=' + 2)
        .success(function (posts) {
            $scope.tinMois = posts;
        });

    $http.get('/API/PostsAPI?att=feature&&value=' + 1)
        .success(function (posts) {
            $scope.tinNoiBats = posts;
        });
}]);