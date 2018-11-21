/* global angular */
(function () {
    'use strict';
    angular.module('demoDataServicesModule', ['myApp'])
        .factory('demoDataService', ['$http', '$q', function ($http, $q) {

            return {
                             
                get: function (serviceUri, fromCache) {
                    
                    var deferred = $q.defer();


                    var promise = $http.get(serviceUri);

                    promise.then(
                        function (payload) {
                           

                            deferred.resolve(payload.data);
                        },
                        function (payload) {

                            deferred.reject(payload.data);
                        });

                    return deferred.promise;
                },

                post: function (serviceUri, data, invalidateCache) {

                    var deferred = $q.defer();

                    var promise = $http.post(serviceUri, data);

                    promise.then(
                        function (payload) {

                            invalidateCache = angular.isDefined(invalidateCache) ? invalidateCache : true;

                            if (invalidateCache) {
                                //CacheService.remove(serviceUri);
                            }

                            deferred.resolve(payload.data);
                        },
                        function (payload) {
                            deferred.reject(payload.data);
                        });

                    return deferred.promise;
                },

                put: function (serviceUri, data, invalidateCache) {
                    var deferred = $q.defer();

                    var promise = $http.put(serviceUri, data);

                    promise.then(
                        function (payload) {

                            invalidateCache = angular.isDefined(invalidateCache) ? invalidateCache : true;

                            if (invalidateCache) {
                               //CacheService.remove(serviceUri);
                            }

                            deferred.resolve(payload.data);
                        },
                        function (payload) {
                            deferred.reject(payload.data);
                        });

                    return deferred.promise;
                },
                           

                delete: function (serviceUri, invalidateCache) {
                    var deferred = $q.defer();

                    var promise = $http.delete(serviceUri);

                    promise.then(
                        function (payload) {

                            invalidateCache = angular.isDefined(invalidateCache) ? invalidateCache : true;

                            if (invalidateCache) {
                                //CacheService.remove(serviceUri);
                            }

                            deferred.resolve(payload.data);
                        },
                        function (payload) {
                            deferred.reject(payload.data);
                        });

                    return deferred.promise;
                }
            };
        }])



})();