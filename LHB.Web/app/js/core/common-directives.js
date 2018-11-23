(function (angular, $) {
    'use strict';
  
    angular.module('myApp.CommonDirectives', [])
        .directive('ngDraggable', function ($document, $window) {
            function makeDraggable(scope, element, attr) {
                var startX = 0;
                var startY = 0;

                // Start with a random pos
                var x = Math.floor((Math.random() * 500) + 40);
                var y = Math.floor((Math.random() * 360) + 40);

                element.css({
                    position: 'absolute',
                    cursor: 'pointer',
                    top: y + 'px',
                    left: x + 'px'
                });

                element.on('mousedown', function (event) {
                    event.preventDefault();

                    startX = event.pageX - x;
                    startY = event.pageY - y;

                    $document.on('mousemove', mousemove);
                    $document.on('mouseup', mouseup);
                });

                function mousemove(event) {
                    y = event.pageY - startY;
                    x = event.pageX - startX;

                    element.css({
                        top: y + 'px',
                        left: x + 'px'
                    });
                }

                function mouseup() {
                    $document.unbind('mousemove', mousemove);
                    $document.unbind('mouseup', mouseup);
                }
            }
            return {
                link: makeDraggable
            };
        })
        .directive('ngFloatRange', function () {
            return {
                require: 'ngModel',
                link: function (scope, elm, attrs, ctrl) {
                    ctrl.$parsers.unshift(function (viewValue) {
                        var floatRegexp = /^[0-9]+(\.[0-9]{1,2})?$/;
                        var min = parseInt(attrs.min);
                        var max = parseInt(attrs.max);
                        if (floatRegexp.test(viewValue) && viewValue >= min && viewValue <= max) {
                            ctrl.$setValidity('float', true);
                            return parseFloat(viewValue.replace(',', '.'));
                        } else {
                            ctrl.$setValidity('float', false);
                            return undefined;
                        }
                    });
                    var keyCode = [8, 9, 37, 39, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 110, 189, 190];
                    elm.bind("keydown", function (event) {
                        if ($.inArray(event.which, keyCode) === -1) {
                            scope.$apply(function () {
                                scope.$eval(attrs.onlyNum);
                                event.preventDefault();
                            });
                            event.preventDefault();
                        }

                    });
                }
            };
        }).
        directive('ngNumber', ['$filter', '$locale', function ($filter, $locale) {
            return {
                require: 'ngModel',
                scope: {
                    commasOn: '=',
                    ngRequired: '=ngRequired'
                },
                link: function (scope, element, attrs, ngModel) {
                    if (scope.commasOn) {

                        function decimalRex(dChar) {
                            return RegExp("\\d|\\-|\\" + dChar, 'g');
                        }

                        function clearRex(dChar) {
                            return RegExp("\\-{0,1}((\\" + dChar + ")|([0-9]{1,}\\" + dChar + "?))&?[0-9]{0,2}", 'g');
                        }

                        function clearValue(value) {
                            value = String(value);
                            var dSeparator = $locale.NUMBER_FORMATS.DECIMAL_SEP;
                            var cleared = null;

                            if (RegExp("^-[\\s]*$", 'g').test(value)) {
                                value = "-0";
                            }

                            if (decimalRex(dSeparator).test(value)) {
                                cleared = value.match(decimalRex(dSeparator))
                                    .join("").match(clearRex(dSeparator));
                                cleared = cleared ? cleared[0].replace(dSeparator, ".") : null;
                            } else {
                                cleared = null;
                            }

                            return cleared;
                        }

                        ngModel.$parsers.push(function (viewValue) {
                            var cVal = clearValue(viewValue);
                            return parseFloat(cVal);
                        });

                        element.on("blur", function () {

                            var itemValue = ngModel.$modelValue;

                            if (ngModel.$modelValue !== 0 && ngModel.$modelValue !== null) {
                                itemValue = $filter('number')(itemValue, 0);
                            }

                            element.val(itemValue);
                        });

                        element.on("keydown", function () {

                            var allowedSpecialCharKeyCodes = [46, 8, 37, 39, 35, 36, 9];
                            var numberKeyCodes = [44, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105];
                            var commaKeyCode = [188];

                            var legalKeyCode =
                                (!event.shiftKey && !event.ctrlKey && !event.altKey)
                                    &&
                                    (jQuery.inArray(event.keyCode, allowedSpecialCharKeyCodes) >= 0
                                        ||
                                        jQuery.inArray(event.keyCode, numberKeyCodes) >= 0
                                        ||
                                        jQuery.inArray(event.keyCode, commaKeyCode) >= 0);

                            // Allow for $
                            if (!legalKeyCode && event.shiftKey && event.keyCode === 52)
                                legalKeyCode = true;

                            if (legalKeyCode === false)
                                event.preventDefault();

                        });

                    } else {
                        var keyCode = [8, 9, 37, 39, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 188];
                        element.bind("keydown", function (event) {
                            if ($.inArray(event.which, keyCode) === -1) {
                                scope.$apply(function () {
                                    scope.$eval(attrs.onlyNum);
                                    event.preventDefault();
                                });
                                event.preventDefault();
                            }

                        });

                    }
                }
            };
        }]).

      

            directive('ngDecimal', function () {
                return function (scope, element, attrs) {

                    var keyCode = [8, 9, 37, 39, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 110, 188, 189, 190];
                    element.bind("keydown", function (event) {
                        if ($.inArray(event.which, keyCode) === -1) {
                            scope.$apply(function () {
                                scope.$eval(attrs.onlyNum);
                                event.preventDefault();
                            });
                            event.preventDefault();
                        }

                    });
                };
            }).

        directive('numbersOnly', function () {
            return {
                require: 'ngModel',
                link: function (scope, element, attrs, modelCtrl) {
                    modelCtrl.$parsers.push(function (inputValue) {

                        if (inputValue === undefined)
                            return '';

                        var transformedInput = inputValue.replace(/[^0-9]/g, '');
                        if (transformedInput !== inputValue) {
                            modelCtrl.$setViewValue(transformedInput);
                            modelCtrl.$render();
                        }

                        return transformedInput;
                    });
                }
            };
        }).
     
        directive('ngCurrency', [
            '$filter', '$locale', function ($filter, $locale) {
                return {
                    require: 'ngModel',
                    scope: {
                        min: '=min',
                        max: '=max',
                        currencySymbol: '@',
                        ngRequired: '=ngRequired'
                    },
                    link: function (scope, element, attrs, ngModel) {

                        function decimalRex(dChar) {
                            return RegExp("\\d|\\-|\\" + dChar, 'g');
                        }

                        function clearRex(dChar) {
                            return RegExp("\\-{0,1}((\\" + dChar + ")|([0-9]{1,}\\" + dChar + "?))&?[0-9]{0,2}", 'g');
                        }

                        function clearValue(value) {
                            value = String(value);
                            var dSeparator = $locale.NUMBER_FORMATS.DECIMAL_SEP;
                            var cleared = null;

                            if (RegExp("^-[\\s]*$", 'g').test(value)) {
                                value = "-0";
                            }

                            if (decimalRex(dSeparator).test(value)) {
                                cleared = value.match(decimalRex(dSeparator))
                                    .join("").match(clearRex(dSeparator));
                                cleared = cleared ? cleared[0].replace(dSeparator, ".") : null;
                            } else {
                                cleared = null;
                            }

                            return cleared ? cleared : "0";
                        }

                        function currencySymbol() {
                            if (angular.isDefined(scope.currencySymbol)) {
                                return scope.currencySymbol;
                            } else {
                                return $locale.NUMBER_FORMATS.CURRENCY_SYM;
                            }
                        }

                        ngModel.$parsers.push(function (viewValue) {
                            var cVal = clearValue(viewValue);
                            return parseFloat(cVal);
                        });

                        element.on("blur", function () {
                            if (ngModel.$modelValue === "0") {
                                $(this).val('').removeClass('placeholder');
                            }

                            ngModel.$modelValue = ngModel.$modelValue ? ngModel.$modelValue : "0";
                            var value = $filter('currency')(ngModel.$modelValue, currencySymbol());

                            element.val(value);
                        });
                        element.on("keydown", function () {

                            var allowedSpecialCharKeyCodes = [45, 46, 8, 37, 39, 35, 36, 9, 189];
                            var numberKeyCodes = [44, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105];
                            var commaKeyCode = [188];
                            var decimalKeyCode = [190, 110];

                            var legalKeyCode =
                                (!event.shiftKey && !event.ctrlKey && !event.altKey)
                                    &&
                                    (jQuery.inArray(event.keyCode, allowedSpecialCharKeyCodes) >= 0
                                        ||
                                        jQuery.inArray(event.keyCode, numberKeyCodes) >= 0
                                        ||
                                        jQuery.inArray(event.keyCode, commaKeyCode) >= 0
                                        ||
                                        jQuery.inArray(event.keyCode, decimalKeyCode) >= 0);

                            // Allow for $
                            if (!legalKeyCode && event.shiftKey && event.keyCode === 52)
                                legalKeyCode = true;

                            if (legalKeyCode === false)
                                event.preventDefault();

                        });

                        ngModel.$formatters.unshift(function (value) {
                            if (value !== undefined && value !== null) {

                                if (value.indexOf("$") === 0) {
                                    value = value.substring(1);
                                }


                            }
                            return $filter('currency')(value, currencySymbol());
                        });

                        scope.$watch(function () {
                            return ngModel.$modelValue;
                        }, function (newValue, oldValue) {
                            runValidations(newValue);
                        });

                        function runValidations(cVal) {
                            if (isNaN(cVal)) {
                                return;
                            }
                            if (scope.min) {
                                var min = parseFloat(scope.min);
                                ngModel.$setValidity('min', cVal >= min);
                            }
                            if (scope.max) {
                                var max = parseFloat(scope.max);
                                ngModel.$setValidity('max', cVal <= max);
                            }
                        }
                    }
                };
            }
        ]).
        directive('ngPercent', [
            '$filter', '$locale', function ($filter, $locale) {
                return {
                    require: 'ngModel',
                    scope: {
                        min: '=min',
                        max: '=max',
                        percentSymbol: '@',
                        ngRequired: '=ngRequired'
                    },
                    link: function (scope, element, attrs, ngModel) {

                        function decimalRex(dChar) {
                            return RegExp("\\d|\\-|\\" + dChar, 'g');
                        }

                        function clearRex(dChar) {
                            return RegExp("\\-{0,1}((\\" + dChar + ")|([0-9]{1,}\\" + dChar + "?))&?[0-9]{0,2}", 'g');
                        }

                        function clearValue(value) {
                            value = String(value);
                            var dSeparator = $locale.NUMBER_FORMATS.DECIMAL_SEP;
                            var cleared = null;

                            if (RegExp("^-[\\s]*$", 'g').test(value)) {
                                value = "-0";
                            }

                            if (decimalRex(dSeparator).test(value)) {
                                cleared = value.match(decimalRex(dSeparator))
                                    .join("").match(clearRex(dSeparator));
                                cleared = cleared ? cleared[0].replace(dSeparator, ".") : null;
                            } else {
                                cleared = null;
                            }

                            return cleared;
                        }

                        function percentSymbol() {
                            return '%';
                        }

                        ngModel.$parsers.push(function (viewValue) {
                            var cVal = clearValue(viewValue);
                            return parseFloat(cVal);
                        });

                        element.on("blur", function () {

                            var itemValue = ngModel.$modelValue;

                            if (ngModel.$modelValue !== 0 && ngModel.$modelValue !== null) {
                                var index = ngModel.$modelValue.toString().indexOf(percentSymbol());
                                if (index < 0 && !isNaN(itemValue)) {
                                    itemValue = $filter('number')(itemValue, 2) + percentSymbol();
                                } else if (isNaN(itemValue)) {
                                    itemValue = '0.00' + percentSymbol();

                                }


                            }

                            element.val(itemValue);
                        });

                        element.on("keydown", function () {
                            // key codes from left to right: backspace, tab, ctrl, end, home, left arrow, up arrow, right arrow, down arrow, delete, C, V
                            var allowedSpecialCharKeyCodes = [8, 9, 17, 35, 36, 37, 38, 39, 40, 46, 67, 86];
                            var numberKeyCodes = [44, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105];
                            //var commaKeyCode = [188];
                            var decimalKeyCode = [190, 110];

                            var legalKeyCode =
                                (!event.shiftKey && !event.ctrlKey && !event.altKey)
                                    &&
                                    (jQuery.inArray(event.keyCode, allowedSpecialCharKeyCodes) >= 0
                                        ||
                                        jQuery.inArray(event.keyCode, numberKeyCodes) >= 0
                                        ||
                                        //jQuery.inArray(event.keyCode, commaKeyCode) >= 0
                                        //||
                                        jQuery.inArray(event.keyCode, decimalKeyCode) >= 0);

                            // Allow for $
                            if (!legalKeyCode && event.shiftKey && event.keyCode === 52)
                                legalKeyCode = true;

                            if (legalKeyCode === false)
                                event.preventDefault();

                        });

                        ngModel.$formatters.unshift(function (value) {

                            var itemValue = value;

                            if (ngModel.$modelValue !== 0 && ngModel.$modelValue !== null && !isNaN(ngModel.$modelValue)) {
                                var index = ngModel.$modelValue.toString().indexOf(percentSymbol());
                                if (index < 0) {
                                    itemValue = $filter('number')(value, 2) + percentSymbol();
                                }
                            }

                            return itemValue;

                        });

                        scope.$watch(function () {
                            return ngModel.$modelValue;
                        }, function (newValue, oldValue) {
                            runValidations(newValue);
                        });

                        function runValidations(cVal) {
                            if (isNaN(cVal)) {
                                return;
                            }
                            if (scope.min) {
                                var min = parseFloat(scope.min);
                                ngModel.$setValidity('min', cVal >= min);
                            }
                            if (scope.max) {
                                var max = parseFloat(scope.max);
                                ngModel.$setValidity('max', cVal <= max);
                            }
                        }
                    }
                };
            }
        ])
        .filter('startWith', function () {

            function strStartsWith(str, prefix) {
                return (str.toString().toLowerCase() + "").indexOf(prefix.toLowerCase()) === 0;
            }
            return function (items, search) {
                var name;
                for (var i in search) {
                    name = i;

                }
                var filtered = [];
                angular.forEach(items, function (item) {

                    if (strStartsWith(item[name], search[name])) {
                        filtered.push(item);
                    }
                });

                return filtered;
            };
        })
        //.directive('gmail', function () {
        //    return {
        //        require: 'ngModel',
        //        link: function (scope, elm, attrs, ctrl) {
                    
        //            var EMAIL_REGEXP = /^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/;
        //            ctrl.$validators.email = function (modelValue, viewValue) {
        //                if (ctrl.$isEmpty(modelValue)) {
        //                    // consider empty models to be valid
        //                    return true;
        //                }

        //                if (EMAIL_REGEXP.test(viewValue)) {
        //                    // it is valid
        //                    return true;
        //                }

        //                // it is invalid
        //                return false;
        //            };
        //        }
        //    };
        //})

        // This can be further enhanced to include more messages.
        .factory('csGridService', [
            '$rootScope', function ($rootScope) {

                var message = 'UPDATE_SELECT_SOURCE';

                return {
                    subscribeColumnData: function (scope, callback) {
                        scope.$on(message, function (event, args) {
                            callback(args);
                        });
                    },

                    publishColumnData: function (column, data) {
                        $rootScope.$broadcast(message, { column: column, data: data });
                    }
                };
            }
        ]);

}(angular, jQuery));