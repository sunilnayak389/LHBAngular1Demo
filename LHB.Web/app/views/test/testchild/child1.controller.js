(function () {
    'use strict';
    angular.module("child1module", ['ngRoute', 'CommonServices', 'testserviceModule']);

    angular.module('child1module').controller('child1Ctlr', ['$scope', '$q', '$state', '$stateParams', 'testservice','messageService', function ($scope, $q, $state, $stateParams, testservice, messageService) {
        var vm = this;
        
        $scope.title = "Child1 Page";
        $scope.employeeData = [];
        $scope.myName = $state.params.name;
        vm.myCompany = messageService.messages[0].text || "";
        vm.messages2 = messageService.messages;
        vm.post = {
            text: ''
        };

        vm.postMessage = function () {
            debugger;
            messageService.addMessage(vm.text, "controller 2");
            vm.text = '';
        };
      
    }]);




})();