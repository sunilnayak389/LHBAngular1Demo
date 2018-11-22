(function () {
    'use strict';
    angular.module("test", ['ngRoute', 'CommonServices','testserviceModule']);
    
    angular.module('test').controller('testCtlr', ['$scope','$q', 'testservice', function ($scope, $q, testservice) {
        var vm = this;
        $scope.name = "Liquid HUB";
        vm.name1 = "Capgemini";
        vm.getData = GetTestData;
        vm.testData = [];
        vm.user = {};
        vm.saveData = SaveData;
        $scope.customer = {
            name: 'Naomi',
            address: '1600 Amphitheatre'
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
    }]).directive('myCustomer', function () {
        return {
            template: 'Name: {{customer.name}} Address: {{customer.address}}'
        };
    });;
    

    

})();