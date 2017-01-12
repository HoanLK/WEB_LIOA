myApp.controller("themImageController", ['$scope', '$http', '$window', '$location', '$filter', 'Url', 'MenuMultiLevel', function ($scope, $http, $window, $location, $filter, Url, MenuMultiLevel) {
    $scope.image = {};
    $scope.categories = [];
    $scope.category = {};

    $scope.chooseImage = function () {
        // You can use the "CKFinder" class to render CKFinder in a page:
        var finder = new CKFinder();
        finder.selectActionFunction = function (fileUrl) {
            $scope.image.anh = fileUrl;
            $scope.$apply();
        };
        finder.SelectFunction = 'ShowFileInfo';
        finder.popup();
    }

    //Lấy danh sách Category gán cho $scope.categories
    $http.get('/API/CategoryProductsAPI/').success(function (data) { $scope.categories = MenuMultiLevel.getDropdownMenuCategoryProduct(data); });

    function selectFileWithCKFinder(elementId) {
        var finder = new CKFinder();
        CKFinder.popup({
            chooseFiles: true,
            width: 800,
            height: 600,
            onInit: function (finder) {
                alert("Yes");
                finder.on('files:choose', function (evt) {
                    var file = evt.data.files.first();
                    elementId = file.getUrl();
                });

                finder.on('file:choose:resizedImage', function (evt) {
                    elementId = evt.data.resizedUrl;
                });
            }
        });
    }


    //Lấy idBanner từ Url
    $scope.currentIdImage = Url.getParameterByName('id');

    //Nếu sửa thì trả về giá trị của Banner
    if ($scope.currentIdImage) {
        $http.get('/API/ImageAPI/' + $scope.currentIdImage)
            .success(function (data) {
                $scope.image = {
                    id: data.id,
                    title: data.title,
                    ghichu: data.ghichu,
                    anh: data.anh,
                    idCategoryProduct: data.idCategoryProduct,
                };
                //Giá trị cho Danh mục
                $scope.category = { id: data.idCategoryProduct };
            });
    }
        //Không thì thiết lập giá trị mặc định
    else {
    }


    //Lưu banner
    $scope.saveImage = function () {
        $scope.image.idCategoryProduct = $scope.category.id;
        if ($scope.currentIdImage) {
            $http.put('/API/ImageAPI/' + $scope.image.id, $scope.image)
            .success(function () {
                toastr.success('Thành công', 'Lưu hình ảnh');
            })
            .error(function () {
                toastr.error('Thất bại', 'Thêm hình ảnh')
            });
        } else {
            $http.post('/API/imageAPI/', $scope.image)
            .success(function () {
                toastr.success('Thành công', 'Thêm hình ảnh');
                $window.location.href = '/Admin/Images';
            })
            .error(function () {
                toastr.error('Thất bại', 'Thêm hình ảnh');
            });
        }
    };
    //Lưu bài viết và Thoát
    $scope.saveImageAndExit = function () {
        $scope.image.idCategoryProduct = $scope.category.id;
        if ($scope.currentIdImage) {
            $http.put('/API/ImageAPI/' + $scope.image.id, $scope.image)
            .success(function () {
                $window.location.href = '/Admin/Images';
            })
            .error(function () {
                toastr.error('Thất bại', 'Lưu hình ảnh');
            });
        } else {
            $http.post('/API/ImageAPI/', $scope.image)
            .success(function () {
                $window.location.href = '/Admin/Images';
            })
            .error(function () {
                toastr.error('Thất bại', 'Thêm hình ảnh');
            });
        }
    };
    //Lưu bài viết và Thêm mới
    $scope.saveImageAndNew = function () {
        $scope.image.idCategoryProduct = $scope.category.id;
        if ($scope.currentIdImage) {
            $http.put('/API/ImageAPI/' + $scope.image.id, $scope.image)
            .success(function () {
                $window.location.href = '/Admin/Images/Create';
            })
            .error(function () {
                toastr.error('Thất bại', 'Lưu hình ảnh')
            });
        } else {
            $http.post('/API/ImageAPI/', $scope.image)
            .success(function () {
                $window.location.href = '/Admin/images/Create';
            })
            .error(function () {
                toastr.error('Thất bại', 'Thêm hình ảnh')
            });
        }
    };
    //Hủy bỏ
    $scope.cancel = function () {
        $window.location.href = '/Admin/Images';
    };

    console.log($scope.image.image);
}]);