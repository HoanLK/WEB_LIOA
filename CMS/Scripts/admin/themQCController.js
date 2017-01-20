myApp.controller("themQCController", ['$scope', '$http', '$window', '$location', '$filter', 'Url', function ($scope, $http, $window, $location, $filter, Url) {
    $scope.QC = {};

    $scope.chooseImage = function () {
        // You can use the "CKFinder" class to render CKFinder in a page:
        var finder = new CKFinder();
        finder.selectActionFunction = function (fileUrl) {
            $scope.QC.image = fileUrl;
            $scope.$apply();
        };
        finder.SelectFunction = 'ShowFileInfo';
        finder.popup();
    }


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


    //Lấy idQC từ Url
    $scope.currentIdQC = Url.getParameterByName('id');

    //Nếu sửa thì trả về giá trị của QC
    if ($scope.currentIdQC) {
        $http.get('/API/QCAPI/' + $scope.currentIdQC)
            .success(function (data) {
                $scope.QC = {
                    id: data.id,
                    title: data.title,
                    image: data.image,
                    link: data.link,
                };
            });
    }
        //Không thì thiết lập giá trị mặc định
    else {
    }


    //Lưu QC
    $scope.saveQC = function () {
        if ($scope.currentIdQC) {
            $http.put('/API/QCAPI/' + $scope.QC.id, $scope.QC)
            .success(function () {
                toastr.success('Thành công', 'Lưu quảng cáo');
            })
            .error(function () {
                toastr.error('Thất bại', 'Thêm quảng cáo')
            });
        } else {
            $http.post('/API/QCAPI/', $scope.QC)
            .success(function () {
                toastr.success('Thành công', 'Thêm quảng cáo');
                $window.location.href = '/Admin/QCs';
            })
            .error(function () {
                toastr.error('Thất bại', 'Thêm quảng cáo');
            });
        }
    };
    //Lưu bài viết và Thoát
    $scope.saveQCAndExit = function () {
        if ($scope.currentIdQC) {
            $http.put('/API/QCAPI/' + $scope.QC.id, $scope.QC)
            .success(function () {
                $window.location.href = '/Admin/QCs';
            })
            .error(function () {
                toastr.error('Thất bại', 'Lưu quảng cáo');
            });
        } else {
            $http.post('/API/QCAPI/', $scope.QC)
            .success(function () {
                $window.location.href = '/Admin/QCs';
            })
            .error(function () {
                toastr.error('Thất bại', 'Thêm quảng cáo');
            });
        }
    };
    //Lưu bài viết và Thêm mới
    $scope.saveQCAndNew = function () {
        if ($scope.currentIdQC) {
            $http.put('/API/QCAPI/' + $scope.QC.id, $scope.QC)
            .success(function () {
                $window.location.href = '/Admin/QCs/Create';
            })
            .error(function () {
                toastr.error('Thất bại', 'Lưu quảng cáo')
            });
        } else {
            $http.post('/API/QCsAPI/', $scope.QC)
            .success(function () {
                $window.location.href = '/Admin/QCs/Create';
            })
            .error(function () {
                toastr.error('Thất bại', 'Thêm quảng cáo')
            });
        }
    };
    //Hủy bỏ
    $scope.cancel = function () {
        $window.location.href = '/Admin/QCs';
    }
}]);