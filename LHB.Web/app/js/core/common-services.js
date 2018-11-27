/* global angular */
(function () {
    'use strict';

    angular.module('CommonServices', ['myApp'])
        .factory('rootScopeSearch', [function () {
            var service = {
                RetainedSearchParams: {}
            };
            return service;
        }])
        .factory('CacheService', ['$cacheFactory', function ($cacheFactory) {
            var cacheObject = $cacheFactory('app-cache');
            console.log(cacheObject);
            return cacheObject;

        }])
        .factory('DataService', ['$http', '$q', 'UIService', 'CacheService', function ($http, $q, UIService, CacheService) {

            return {
               
                clearCache: function (serviceUri) {
                    CacheService.remove(serviceUri);
                },

                get: function (serviceUri, fromCache) {
                  
                    fromCache = angular.isDefined(fromCache) ? fromCache : false;

                    var deferred = $q.defer();

                    var cached = CacheService.get(serviceUri);

                    if (fromCache && cached) {
                        deferred.resolve(cached);
                    }
                    else {

                        // var promise = $http.get(serviceUri, { headers: { 'Authorization': 'Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==' }});
                        var promise = $http.get(serviceUri);

                        promise.then(
                            function (payload) {
                                CacheService.put(serviceUri, payload.data);

                                deferred.resolve(payload.data);
                            },
                            function (payload) {

                                deferred.reject(payload.data);
                            });
                    }

                    return deferred.promise;
                },

                post: function (serviceUri, data, invalidateCache) {

                    var deferred = $q.defer();

                    var promise = $http.post(serviceUri, data);

                    promise.then(
                        function (payload) {

                            invalidateCache = angular.isDefined(invalidateCache) ? invalidateCache : true;

                            if (invalidateCache) {
                                CacheService.remove(serviceUri);
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
                                CacheService.remove(serviceUri);
                            }

                            deferred.resolve(payload.data);
                        },
                        function (payload) {
                            deferred.reject(payload.data);
                        });

                    return deferred.promise;
                },

                patch: function (serviceUri, data, invalidateCache) {
                    var deferred = $q.defer();

                    var promise = $http.patch(serviceUri, data);

                    promise.then(
                        function (payload) {

                            invalidateCache = angular.isDefined(invalidateCache) ? invalidateCache : true;

                            if (invalidateCache) {
                                CacheService.remove(serviceUri);
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
                                CacheService.remove(serviceUri);
                            }

                            deferred.resolve(payload.data);
                        },
                        function (payload) {
                            deferred.reject(payload.data);
                        });

                    return deferred.promise;
                }
            };
        }]).

        factory('rootScope', ['$rootScope', function ($rootScope) {
            var service = {
                MyRequestsTabState: {
                    CurrentActiveTab: "",
                    setTabState: false
                },
            }
            return service;
        }]).

        factory('UIService', ['LibService', '$uibModal', function (libService, $uibModal) {
            return {

                notification: {
                    success: function (message) {
                        libService.notifier.success(message);
                    },

                    error: function (message) {
                        libService.notifier.error(message);
                    },

                    info: function (message) {
                        libService.notifier.info(message);
                    }
                },
                popupModal: {
                    open: function (modalTemplateUrl, $scope, size) {
                        return $uibModal.open({
                            templateUrl: modalTemplateUrl + '?t=' + new Date().getMilliseconds(),
                            scope: $scope,
                            size: size,
                            backdrop: 'static'
                        });
                    },

                    close: function (modalInstance) {
                        modalInstance.dismiss();
                    }
                },

                blocker: {

                    blockui: libService.blocker.block,

                    unblockui: libService.blocker.unblock
                }
            };
        }]).
        factory('KeywordEnumService', function () {
            return {
                "JobType": 1,
                "JobOffered": 2
            };
        })
        .factory('messageService', function () {
            var messenger = {
                messages: [],
                identity: 0,
                addMessage: function (text, caller) {

                    this.identity += 1;
                    var id = this.identity,
                        message = {
                            text: caller + ": " + text,
                            id: id
                        };

                    this.messages.push(message);
                }
            };

            return messenger;
        })
        .factory('UserRoleService', function () {
            return {
                userRoles: {},
                roles: {},
                userId: '',
                userCompanyIds: [],
                isInternalUser: false
            };
        });

})();