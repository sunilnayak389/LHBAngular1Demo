/* global angular */
(function () {
    angular.module('demoservice', ['CommonServices'])
        .factory('demoservice', [
            '$q', 'DataService', function ($q, dataService) {
                var baseUrl = "http://localhost:58491/";
        
                return {
                    
                    GetEmployeeData: function () {
                        return dataService.get(baseUrl+'api/Demo/GetEmployee', false);

                    },

                    DeleteGraduationDetails: function (id) {
                        return dataService.post('api/Admin/DeleteGraduationDetails/' + id);
                    },
                    SaveEmployeeData: function (values) {
                        return dataService.post(baseUrl + 'api/Demo/SaveEmployee', values);
                    },
                };
            }
        ]);
})();