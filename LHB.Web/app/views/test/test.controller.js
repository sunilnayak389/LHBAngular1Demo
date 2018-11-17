(function () {
    'use strict';
    angular.module("test", ['ngRoute', 'CommonServices']);
    
    angular.module('test').controller('testCtlr', ['$scope', function ($scope) {
        var vm = this;
        $scope.name = "Liquid HUB";
        vm.name1 = "Capgemini";
    }]);
    

    

})();