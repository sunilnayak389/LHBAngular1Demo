﻿(function () {
    'use strict';
    angular.module("test", ['ngRoute', 'CommonServices', 'testserviceModule', 'myApp.CommonDirectives']);
    
    angular.module('test').controller('testCtlr', ['$scope', '$q', '$state', '$stateParams', 'testservice', function ($scope, $q, $state, $stateParams, testservice) {
        var vm = this;

        $scope.name = "Liquid HUB";
        vm.name1 = "Capgemini";
        vm.getData = GetTestData;
        vm.testData = [];
        vm.user = {};
        vm.search = "";
        $scope.gmail = "";
        vm.saveData = SaveData;
        $scope.submitForm = submitForm;

        $scope.customer = {
            name: 'Naomi',
            address: '1600 Amphitheatre'
        };
        function submitForm(form) {
            debugger;
        }

        //Directive

        $scope.abhi = {};
        $scope.abhi.name = "Abhimanyu";
        $scope.rohit = {};
        $scope.rohit.name = "Rohit";


        $scope.items = [{
            salutation: 'Hello',
            name: 'World'
        }, {
            salutation: 'Konichiwa',
            name: 'Mr. Roboto'
        }];
        //

        vm.myName = $state.params.name;
        

        function SaveData() {
            return testservice.SaveEmployeeData(vm.user).then(function (data) {

                if (data) {
                    alert("Saved successfully");
                }
            }, function (error) {

                console.log("error occured");
            }
            );
        }
        function GetTestData() {


            return testservice.GetEmployeeData().then(function (data) {

                if (data) {
                    vm.testData = data.data;
                }
            }, function (error) {

                console.log("error occured");
            }
            )
        }

        //start
        //function asyncGreet1(name) {
        //    // perform some asynchronous operation, resolve or reject the promise when appropriate.
        //    return $q(function (resolve, reject) {

        //        setTimeout(function () {
        //            if (5 == 5) {
        //                resolve('Hello, ' + name + '!');
        //            } else {
        //                reject('Greeting ' + name + ' is not allowed.');
        //            }
        //        }, 1000);
        //    });
        //};

        //var promise = asyncGreet1('Robin Hood');
        //promise.then(function (greeting) {
        //    alert('Success: ' + greeting);
        //}, function (reason) {
        //    alert('Failed: ' + reason);
        //});
        //End
    }])
        .filter('startsWithLetter', function () {
            return function (items, letter) {
                
                var filtered = [];
                var letterMatch = new RegExp(letter, 'i');
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    if (letterMatch.test(item.name.substring(0, 1))) {
                        filtered.push(item);
                    }
                }
                return filtered;
            };
        })
        .filter('pascalCase', function () {
            return function (input) {
               
                return input.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
            }
        })
        .filter('convertMillion', [function () {
            return function (value) {
                var million = Math.pow(10, 6);
                if (value >= million) {
                    return Math.round(value / million) + ' million(s)';
                } else {
                    return value;
                }
            };
        }])
        .filter('startsWithA', function () {
            return function (items, idName) {
                debugger;
                var filtered = [];
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    if (/a/i.test(item[idName].substring(0, 1))) {
                        filtered.push(item);
                    }
                }
                return filtered;
            };
        })
        .directive('myCustomer', function () {
        return {
            template: 'Name: {{customer.name}} Address: {{customer.address}}'
        };
        })
        .directive('gmail', function () {
            return {
                require: 'ngModel',
                link: function (scope, elm, attrs, ctrl) {
                    debugger;
                    var EMAIL_REGEXP = /^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/;
                    ctrl.$validators.email = function (modelValue, viewValue) {
                        if (ctrl.$isEmpty(modelValue)) {
                            // consider empty models to be valid
                            return true;
                        }

                        if (EMAIL_REGEXP.test(viewValue)) {
                            // it is valid
                            return true;
                        }

                        // it is invalid
                        return false;
                    };
                }
            };
        })
        ;
    

    

})();