/* global angular */
(function () {
    angular.module('testserviceModule', ['CommonServices'])
        .factory('testservice', [
            '$q', 'DataService', function ($q, dataService) {
                var baseUrl = "http://localhost:58491/";

                return {

                    GetEmployeeData: function () {
                        return dataService.get(baseUrl + 'api/Demo/GetEmployee', true);

                    },

                    DeleteGraduationDetails: function (id) {
                        return dataService.post('api/Admin/DeleteGraduationDetails/' + id);
                    },
                    SaveEmployeeData: function (values) {
                        debugger;
                        return dataService.post(baseUrl + 'api/Demo/SaveEmployee', values);
                    },
                };
            }
        ]);
})();