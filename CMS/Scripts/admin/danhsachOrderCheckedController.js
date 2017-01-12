myApp.controller("danhsachOrderCheckedController",['$scope', '$http', '$window', 'uiGridConstants', function ($scope, $http, $window, uiGridConstants) {
    $scope.Orders = [];
    $scope.gridOptions = {};
    $scope.Order = {};

    //Lấy danh sách Post
    $http.get('/Orders/GetAllOrdersChecked/').success(function (data) {
        $scope.gridOptions.data = data;
    });

    //Tùy chỉnh Column
    $scope.gridOptions.rowHeight = 50;
    $scope.gridOptions.columnDefs =
    [
        {
            displayName: "STT",
            name: 'stt',
            enableCellEdit: false,
            enableSorting: false,
            enableFiltering: false,
            width: 55,
            cellTemplate: '<div class="ui-grid-cell-contents text-center">{{grid.renderContainers.body.visibleRowCache.indexOf(row)+1}}</div>'
        },
        //{
        //    displayName: "ID",
        //    name: 'idOrder',
        //    enableSorting: false,
        //    width: 60,
        //},
        {
            displayName: "Họ tên",
            name: 'hoTen',
            enableSorting: false
        },
        {
            displayName: "Địa chỉ",
            name: 'diaChi',
            enableSorting: false
        },
        {
            displayName: "SĐT",
            name: 'SDT',
            enableSorting: false
        },
        {
            displayName: "Email",
            name: 'email',
            enableSorting: false
        },
        {
            displayName: "Sản phẩm",
            name: 'sanPham',
            enableSorting: false
        },
        {
            displayName: "Số lượng",
            name: 'soLuong',
            enableSorting: false,
        },
        {
            displayName: "",
            name: 'delete',
            enableSorting: false,
            enableFiltering: false,
            width: 100,
            enableCellEdit: false,
            //cellTemplate: '<div ><button style="margin-left: 10px; margin-top: 3px;" class="btn btn-xs btn-info" ng-click="grid.appScope.CheckOrder(row.entity.idOrder)"><span class="fa fa-check"></span></button><button style="margin-left: 10px; margin-top: 3px;" class="btn btn-xs btn-danger" ng-click="grid.appScope.DeleteOrder(row.entity.idOrder)"><span class="fa fa-bitbucket"></span></button></div>',
            cellTemplate: '<div><button style="margin-left: 10px; margin-top: 3px;" class="btn btn-xs btn-info" ng-click="grid.appScope.EditOrder(row.entity.idOrder)"><span class="fa fa-eye"></span></button><button style="margin-left: 10px; margin-top: 3px;" class="btn btn-xs btn-danger" ng-click="grid.appScope.DeleteOrder(row.entity.idOrder)"><span class="fa fa-bitbucket"></span></button></div>',
        }
    ];

    //Phan trang
    $scope.gridOptions.paginationPageSizes = [10, 25, 50, 75];
    $scope.gridOptions.paginationPageSize = 25;

    //Tim kiem
    $scope.gridOptions.enableFiltering = true;
    //Select
    $scope.gridOptions.enableRowSelection = true;
    $scope.gridOptions.enableRowHeaderSelection = false;
    $scope.gridOptions.multiSelect = false;

    //Grid API
    $scope.gridOptions.onRegisterApi = function (gridApi) {

    };

    //Edit
    $scope.EditOrder = function (id) {
        $window.location.href = '/Admin/Orders/Create?idOrder=' + id;
    }

    //Delete
    $scope.DeleteOrder = function (id) {
        var id = id;

        if (confirm("Bạn có chắc chắn muốn xóa?")) {
            //Xóa
            $http.delete('/API/OrderAPI/' + id)
            .success(function () {
                $http.get('/Orders/GetAllOrdersChecked/').success(function (data) { $scope.gridOptions.data = data; });
                toastr.success('Thành công', 'Xóa');
            });
        }
    }
}]);