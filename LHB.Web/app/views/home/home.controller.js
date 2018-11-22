(function () {
    'use strict';
    angular.module("home", ['ngRoute', 'CommonServices', 'testserviceModule']);

    angular.module('home').controller('homeCtlr', ['$scope', '$q', 'testservice', function ($scope, $q, testservice) {
        var vm = this;
       
        $scope.name = "Liquid HUB Home Page";
        $scope.address = "Hyderbad";
       
    }]);




})();