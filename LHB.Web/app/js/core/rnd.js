(function () {
    'use strict';
    angular.module("admin.city", ['ngRoute', 'CommonServices', 'myApp.CommonDirectives', 'Lawyer.adminService', 'Lawyer.ConstantService']);
    angular.module('admin.city').config(config);

    angular.module('admin.city').controller('cityController', cityController);
    cityController.$inject = ['$scope', '$rootScope', '$q', 'cityResolver', '$location', 'adminService', 'UIService'];
    config.$inject = ['$routeProvider'];
    function config($routeProvider) {
        $routeProvider.when("/Admin/City",
            {
                templateUrl: "/Content/views/Admin/City.html",
                controller: 'cityController',
                controllerAs: 'vm',
                caseInsensitiveMatch: true,
                resolve: { cityResolver: cityResolver }

            });

    }
    cityResolver.$inject = ['$q', 'adminService', '$location', '$route'];

    function cityResolver($q, adminService, $location, $route) {
        var data = adminService.GetCityDetails();
        return $q.all([data]).then(function (results) {
            return {
                resultData: results[0]
            };
        });
    }
    function cityController($scope, $rootScope, $q, cityResolver, $location, adminService, uiService) {
        var vm = this;

        vm.stateDetails = cityResolver.resultData.StateList;
        vm.cityDetails = cityResolver.resultData.CityList;
        vm.userRole = $scope.$parent.vm.loggedinUser.Role;
        //vm.codeList = codeGenerateResolver.resultData;
        vm.editCity = editCity;
        vm.deleteCity = deleteCity;
        vm.removeRowData = removeRowData;
        vm.cancelCity = cancelCity;
        vm.saveCity = saveCity;
        vm.totalItems = vm.cityDetails.length;
        vm.predicate = 'Name';
        vm.reverse = false;
        vm.currentPage = 1;
        vm.order = sorting;

        vm.paginate = paginate;
        vm.numPerPage = 20;
        //$rootScope.$on("navEvent", function (event, args) {
        //    vm.user.profileId = args.ProfileId;
        //    vm.user.userName = args.UserName;
        //    vm.user.role = args.Role;
        //});
        function paginate(value) {
            var begin, end, index;
            begin = (vm.currentPage - 1) * vm.numPerPage;
            end = begin + vm.numPerPage;
            index = vm.cityDetails.indexOf(value);
            return (begin <= index && index < end);
        };
        function sorting(predicate) {
            vm.reverse = (vm.predicate === predicate) ? !vm.reverse : false;
            vm.predicate = predicate;
        };
        function saveCity() {
            {
                if (vm.city != undefined && vm.city != "") {
                    uiService.blocker.blockui();
                    return adminService.SaveCity(vm.city).then(function (data) {
                        if (data) {
                            if (data.Success) {
                                uiService.notification.success(data.Message);
                                vm.city = "";
                                vm.cityDetails = data.ReturnData.CityList;
                            }
                            else {
                                uiService.notification.error(data.Message);

                            }

                            uiService.blocker.unblockui();
                        } else {
                            uiService.notification.error('Error Occured!');
                            return $q.reject();
                        }
                    });
                    return $q.resolve();
                }
                else {
                    uiService.notification.error('Please Enter the city Name and Code !');
                }

            };
        };
        //Edit CaseReview
        function editCity(Id) {
            vm.city = vm.cityDetails.filter(function (item) { return item.Id === Id; })[0] || {};
        };
        function cancelCity() {
            vm.city = {};
        }
        function removeRowData(id, index) {
            deleteCity(id, index);
        }
        function deleteCity(id, index) {
            if (id !== 0 && id !== null) {
                uiService.blocker.blockui();
                return adminService.DeleteCityDetails(id).then(function (data) {
                    $("#delete").modal('hide');
                    if (data) {
                        if (data.Success) {
                            uiService.notification.success(data.Message);
                            vm.cityDetails = data.ReturnData.CityList;
                        }
                        else {
                            uiService.notification.error("Unable to delete");
                        }

                    } else {
                        uiService.notification.error('Error Occured!');
                        uiService.blocker.blockui();
                        return $q.reject();
                    }
                    uiService.blocker.unblockui();
                });
                return $q.resolve();
            }
            return true;

        }

    };

   

})();