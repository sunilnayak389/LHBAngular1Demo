(function () {
    'use strict';
    angular.module("demo", ['ngRoute', 'CommonServices'])
       //.controller('demoCtlr', demoCtlr);
    angular.module('demo').config(config);

    function config($routeProvider) {

        $routeProvider.when("/demo",
          {
              templateUrl: "/app/views/demo/demo.html",
              controllerAs: 'vm',
              controller: 'demoCtlr',

          });
    }
    angular.module('demo').controller('demoCtlr', demoCtlr);
    demoCtlr.$inject = ['$scope', '$q'];


   

    function demoCtlr($scope, $q) {
        var vm = this;
        $scope.name = "Liquid HUB";
        vm.name1 = "Capgemini";


    }

})();