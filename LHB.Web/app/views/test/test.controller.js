(function () {
    'use strict';
    angular.module("test", ['ngRoute', 'ngStorage', 'CommonServices', 'testserviceModule', 'myApp.CommonDirectives']);
    
    angular.module('test').controller('testCtlr', ['$scope', '$rootScope', '$q', '$state', '$stateParams', 'testservice', 'messageService', '$localStorage', function ($scope, $rootScope, $q, $state, $stateParams, testservice, messageService, $localStorage) {
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

        $scope.$storage = $localStorage.$default({
          x: 42
        });
        
        $scope.deleteX = function() {
          delete $scope.$storage.x;
        };
        
        $scope.deleteY = function() {
          delete $localStorage.y;
        };

        function submitForm(form) {
            debugger;
        }

        //Directive
        $scope.dirname = "Itishree";

        $scope.abhi = {};
        $scope.abhi.name = "Abhimanyu";
        $scope.rohit = {};
        $scope.rohit.name = "Rohit";

        $scope.userData = { name: 'LiquidHub' };



        $scope.items = [{
            salutation: 'Hello',
            name: 'World'
        }, {
            salutation: 'Konichiwa',
            name: 'Mr. Roboto'
        }];
        //

        vm.myName = $state.params.name;

        vm.messages1 = messageService.messages;
        vm.post = {
            text: ''
        };

        vm.postMessage = function () {
            debugger;
            messageService.addMessage(vm.text, "controller 1");
            vm.text = '';
        };

     
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
        });
      })();