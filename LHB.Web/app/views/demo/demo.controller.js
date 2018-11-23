(function () {
    'use strict';
    angular.module("demo", ['ngRoute', 'CommonServices', 'demoservice'])
    .filter('startsWithA', function () {
        return function (items) {
            debugger;
            var filtered = [];
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (/a/i.test(item.name.substring(0, 1))) {
                    filtered.push(item);
                }
            }
            return filtered;
        };
        })
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
        .filter('pascalCase', function () {
            return function (input) {
                return input.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
            }
        });
       //.controller('demoCtlr', demoCtlr);
  //  angular.module('demo').config(config);

    //function config($routeProvider) {

    //    $routeProvider.when("/demo",
    //      {
    //          templateUrl: "/app/views/demo/demo.html",
    //          controllerAs: 'vm',
    //          controller: 'demoCtlr',

    //      });
    //}
    angular.module('demo').controller('demoCtlr', demoCtlr);
    demoCtlr.$inject = ['$scope', '$q', 'demoservice'];


   

    function demoCtlr($scope, $q, demoService) {
        var vm = this;
        vm.myname = "Sunil Nayak";
        vm.empData = [];
        $scope.name = "Liquid HUB";
        vm.name1 = "Capgemini";
        vm.user = {};
        vm.logIn = logIn;

        vm.lectureData = [
            {
                "Name": "C.V. Raman",
                "DOB": "1888-11-07",
                "Department": "Physics",
                "HoldingValue": 2021402.3123
            },
            {
                "Name": "K. S. Chandrasekharan",
                "DOB": "1920-11-21",
                "Department": "Astro Physics",
                "HoldingValue": 209123.3812
            },
            {
                "Name": "Albert Einstein",
                "DOB": "1879-03-14",
                "Department": "Theoritical Physics",
                "HoldingValue": 198712.0192
            },
            {
                "Name": "Prafulla Chandra Ray",
                "DOB": "1861-08-02",
                "Department": "Chemistry",
                "HoldingValue": 231238723.23
            },
            {
                "Name": "Salim Ali",
                "DOB": "1896-11-12",
                "Department": "Naturalist",
                "HoldingValue": 9123802.8291
            },
            {
                "Name": "Srinivasa Ramanujan",
                "DOB": "1887-12-22",
                "Department": "Mathematics",
                "HoldingValue": 9123802.8291
            }
        ]

        init();
        function init() {
            
            return demoService.GetEmployeeData().then(function (data) {
            
                if (data) {
                    vm.empData = data;
                }
            }, function (error) {

                console.log("error occured");
                }
            )
        }

        function logIn() {
            return demoService.SaveEmployeeData(vm.user).then(function (data) {
                debugger;
                if (data) {
                    alert("Saved successfully");
                }
            }, function (error) {

                console.log("error occured");
            }
            );
        }

        //start
        function asyncGreet1(name) {
            // perform some asynchronous operation, resolve or reject the promise when appropriate.
            return $q(function (resolve, reject) {
                setTimeout(function () {
                    if (5==8) {
                        resolve('Hello, ' + name + '!');
                    } else {
                        reject('Greeting ' + name + ' is not allowed.');
                    }
                }, 1000);
            });
        };

        var promise = asyncGreet1('Robin Hood');
        promise.then(function (greeting) {
            alert('Success: ' + greeting);
        }, function (reason) {
            alert('Failed: ' + reason);
        });
        //End


    }

})();