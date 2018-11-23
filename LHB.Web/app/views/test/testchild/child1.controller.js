(function () {
    'use strict';
    angular.module("child1module", ['ngRoute', 'CommonServices', 'testserviceModule']);

    angular.module('child1module').controller('child1Ctlr', ['$scope', '$q', '$state', '$stateParams', 'testservice', function ($scope, $q, $state, $stateParams, testservice) {
        var vm = this;
        
        $scope.title = "Child1 Page";
      
        $scope.myName = $state.params.name;


     
    }]);




})();