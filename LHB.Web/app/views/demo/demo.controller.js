﻿(function () {
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
        ];


        angular.element(document).ready(function () {
            // Setup - add a text input to each footer cell


            $('#example tfoot th').each(function () {
                var title = $(this).text();
                $(this).html('<input type="text" placeholder="Search ' + title + '" />');
            });



            console.log('  document ready function, add search by column feature ');


            var table = $('#example').DataTable();



            // Apply the search
            table.columns().every(function () {
                var self = this;

                $('input', this.footer()).on('keyup change', function () {
                    if (self.search() !== this.value) {
                        self
                            .search(this.value)
                            .draw();
                    }
                });
            });




        });// document ready


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

        $scope.data = [
            [
                "Tiger Nixon",
                "System Architect",
                "Edinburgh",
                "5421",
                "2011\/04\/25",
                "$320,800"
            ],
            [
                "Garrett Winters",
                "Accountant",
                "Tokyo",
                "8422",
                "2011\/07\/25",
                "$170,750"
            ],
            [
                "Ashton Cox",
                "Junior Technical Author",
                "San Francisco",
                "1562",
                "2009\/01\/12",
                "$86,000"
            ],
            [
                "Cedric Kelly",
                "Senior Javascript Developer",
                "Edinburgh",
                "6224",
                "2012\/03\/29",
                "$433,060"
            ],
            [
                "Airi Satou",
                "Accountant",
                "Tokyo",
                "5407",
                "2008\/11\/28",
                "$162,700"
            ],
            [
                "Brielle Williamson",
                "Integration Specialist",
                "New York",
                "4804",
                "2012\/12\/02",
                "$372,000"
            ],
            [
                "Herrod Chandler",
                "Sales Assistant",
                "San Francisco",
                "9608",
                "2012\/08\/06",
                "$137,500"
            ],
            [
                "Rhona Davidson",
                "Integration Specialist",
                "Tokyo",
                "6200",
                "2010\/10\/14",
                "$327,900"
            ],
            [
                "Colleen Hurst",
                "Javascript Developer",
                "San Francisco",
                "2360",
                "2009\/09\/15",
                "$205,500"
            ],
            [
                "Sonya Frost",
                "Software Engineer",
                "Edinburgh",
                "1667",
                "2008\/12\/13",
                "$103,600"
            ],
            [
                "Jena Gaines",
                "Office Manager",
                "London",
                "3814",
                "2008\/12\/19",
                "$90,560"
            ],
            [
                "Quinn Flynn",
                "Support Lead",
                "Edinburgh",
                "9497",
                "2013\/03\/03",
                "$342,000"
            ],
            [
                "Charde Marshall",
                "Regional Director",
                "San Francisco",
                "6741",
                "2008\/10\/16",
                "$470,600"
            ],
            [
                "Haley Kennedy",
                "Senior Marketing Designer",
                "London",
                "3597",
                "2012\/12\/18",
                "$313,500"
            ],
            [
                "Tatyana Fitzpatrick",
                "Regional Director",
                "London",
                "1965",
                "2010\/03\/17",
                "$385,750"
            ],
            [
                "Michael Silva",
                "Marketing Designer",
                "London",
                "1581",
                "2012\/11\/27",
                "$198,500"
            ],
            [
                "Paul Byrd",
                "Chief Financial Officer (CFO)",
                "New York",
                "3059",
                "2010\/06\/09",
                "$725,000"
            ],
            [
                "Gloria Little",
                "Systems Administrator",
                "New York",
                "1721",
                "2009\/04\/10",
                "$237,500"
            ],
            [
                "Bradley Greer",
                "Software Engineer",
                "London",
                "2558",
                "2012\/10\/13",
                "$132,000"
            ],
            [
                "Dai Rios",
                "Personnel Lead",
                "Edinburgh",
                "2290",
                "2012\/09\/26",
                "$217,500"
            ],
            [
                "Jenette Caldwell",
                "Development Lead",
                "New York",
                "1937",
                "2011\/09\/03",
                "$345,000"
            ],
            [
                "Yuri Berry",
                "Chief Marketing Officer (CMO)",
                "New York",
                "6154",
                "2009\/06\/25",
                "$675,000"
            ],
            [
                "Caesar Vance",
                "Pre-Sales Support",
                "New York",
                "8330",
                "2011\/12\/12",
                "$106,450"
            ],
            [
                "Doris Wilder",
                "Sales Assistant",
                "Sidney",
                "3023",
                "2010\/09\/20",
                "$85,600"
            ],
            [
                "Angelica Ramos",
                "Chief Executive Officer (CEO)",
                "London",
                "5797",
                "2009\/10\/09",
                "$1,200,000"
            ],
            [
                "Gavin Joyce",
                "Developer",
                "Edinburgh",
                "8822",
                "2010\/12\/22",
                "$92,575"
            ],
            [
                "Jennifer Chang",
                "Regional Director",
                "Singapore",
                "9239",
                "2010\/11\/14",
                "$357,650"
            ],
            [
                "Brenden Wagner",
                "Software Engineer",
                "San Francisco",
                "1314",
                "2011\/06\/07",
                "$206,850"
            ],
            [
                "Fiona Green",
                "Chief Operating Officer (COO)",
                "San Francisco",
                "2947",
                "2010\/03\/11",
                "$850,000"
            ],
            [
                "Shou Itou",
                "Regional Marketing",
                "Tokyo",
                "8899",
                "2011\/08\/14",
                "$163,000"
            ],
            [
                "Michelle House",
                "Integration Specialist",
                "Sidney",
                "2769",
                "2011\/06\/02",
                "$95,400"
            ],
            [
                "Suki Burks",
                "Developer",
                "London",
                "6832",
                "2009\/10\/22",
                "$114,500"
            ],
            [
                "Prescott Bartlett",
                "Technical Author",
                "London",
                "3606",
                "2011\/05\/07",
                "$145,000"
            ],
            [
                "Gavin Cortez",
                "Team Leader",
                "San Francisco",
                "2860",
                "2008\/10\/26",
                "$235,500"
            ],
            [
                "Martena Mccray",
                "Post-Sales support",
                "Edinburgh",
                "8240",
                "2011\/03\/09",
                "$324,050"
            ],
            [
                "Unity Butler",
                "Marketing Designer",
                "San Francisco",
                "5384",
                "2009\/12\/09",
                "$85,675"
            ],
            [
                "Howard Hatfield",
                "Office Manager",
                "San Francisco",
                "7031",
                "2008\/12\/16",
                "$164,500"
            ],
            [
                "Hope Fuentes",
                "Secretary",
                "San Francisco",
                "6318",
                "2010\/02\/12",
                "$109,850"
            ],
            [
                "Vivian Harrell",
                "Financial Controller",
                "San Francisco",
                "9422",
                "2009\/02\/14",
                "$452,500"
            ],
            [
                "Timothy Mooney",
                "Office Manager",
                "London",
                "7580",
                "2008\/12\/11",
                "$136,200"
            ],
            [
                "Jackson Bradshaw",
                "Director",
                "New York",
                "1042",
                "2008\/09\/26",
                "$645,750"
            ],
            [
                "Olivia Liang",
                "Support Engineer",
                "Singapore",
                "2120",
                "2011\/02\/03",
                "$234,500"
            ],
            [
                "Bruno Nash",
                "Software Engineer",
                "London",
                "6222",
                "2011\/05\/03",
                "$163,500"
            ],
            [
                "Sakura Yamamoto",
                "Support Engineer",
                "Tokyo",
                "9383",
                "2009\/08\/19",
                "$139,575"
            ],
            [
                "Thor Walton",
                "Developer",
                "New York",
                "8327",
                "2013\/08\/11",
                "$98,540"
            ],
            [
                "Finn Camacho",
                "Support Engineer",
                "San Francisco",
                "2927",
                "2009\/07\/07",
                "$87,500"
            ],
            [
                "Serge Baldwin",
                "Data Coordinator",
                "Singapore",
                "8352",
                "2012\/04\/09",
                "$138,575"
            ],
            [
                "Zenaida Frank",
                "Software Engineer",
                "New York",
                "7439",
                "2010\/01\/04",
                "$125,250"
            ],
            [
                "Zorita Serrano",
                "Software Engineer",
                "San Francisco",
                "4389",
                "2012\/06\/01",
                "$115,000"
            ],
            [
                "Jennifer Acosta",
                "Junior Javascript Developer",
                "Edinburgh",
                "3431",
                "2013\/02\/01",
                "$75,650"
            ],
            [
                "Cara Stevens",
                "Sales Assistant",
                "New York",
                "3990",
                "2011\/12\/06",
                "$145,600"
            ],
            [
                "Hermione Butler",
                "Regional Director",
                "London",
                "1016",
                "2011\/03\/21",
                "$356,250"
            ],
            [
                "Lael Greer",
                "Systems Administrator",
                "London",
                "6733",
                "2009\/02\/27",
                "$103,500"
            ],
            [
                "Jonas Alexander",
                "Developer",
                "San Francisco",
                "8196",
                "2010\/07\/14",
                "$86,500"
            ],
            [
                "Michael Decker",
                "Regional Director",
                "Edinburgh",
                "6373",
                "2008\/11\/13",
                "$183,000"
            ],
            [
                "Michael Bruce",
                "Javascript Developer",
                "Singapore",
                "5384",
                "2011\/06\/27",
                "$183,000"
            ],
            [
                "Donna Snider",
                "Customer Support",
                "New York",
                "4226",
                "2011\/01\/25",
                "$112,000"
            ]
        ];

        $scope.dataTableOpt = {
            //custom datatable options 
            // or load data through ajax call also
            // "data": $scope.data00, // this is not real binding, the real binding is ui-jq="dataTable" ui-options="dataTableOpt", fill $scope.data
            "retrieve": true,  // angularjs at begining initialize datatable, but don't get a handle to the table, later you want to add search column, you need to get the table handle.
            "aLengthMenu": [[10, 50, 100, -1], [10, 50, 100, 'All']],
        };
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