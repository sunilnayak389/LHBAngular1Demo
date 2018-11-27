(function (angular, $) {
    'use strict';
  
    angular.module('myApp.CommonDirectives', [])
        .directive('lhbDraggable', function ($document, $window) {
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
        })

       
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
        .directive('gmail', function () {
            return {
                require: 'ngModel',
                link: function (scope, elm, attrs, ctrl) {

                    $($(elm)).css('color', 'purple')
                    var EMAIL_REGEXP = /^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/;
                    ctrl.$validators.email = function (modelValue, viewValue) {
                        if (ctrl.$isEmpty(modelValue)) {
                            // consider empty models to be valid
                            return true;
                        }

                        if (EMAIL_REGEXP.test(viewValue)) {
                            // it is valid
                            return true;
                        }

                        // it is invalid
                        return false;
                    };
                }
            };
        })
        .directive('lhbGreetings', function () {
            var directive = {};
            directive.restrict = 'A'; /* restrict this directive to elements */
            directive.template = "<div ng-transclude></div><p> {{greetingTxt}} <strong>{{user.name}}</strong></p>";
            directive.transclude = true;
            directive.scope = {
                user: "=user"
            };
            directive.compile = function (element, attributes) {
                element.css("color", "#e53b2c"); // initial configuration
                var linkFunction = function ($scope, element, attributes) {
                    $scope.greetingTxt = "Hello & Welcome - "; // data binding
                };
                return linkFunction;
            };
            return directive;
        })
        .directive('myGreeting', [function () {
            return {
                restrict: 'E',
                scope: {
                    salutation: '=',
                    name: '='
                },
                template: $('#my-greeting-template').html()
            };
        }])
        .directive('parentDirective', function () {
            return {
                restrict: 'E',
                template: '<child-directive></child-directive>',
                //controller: function ($scope, $element) {
                //    this.name = "Hi Sunil Nayak";
                //}


                //  controller: function ($scope, $element) {
                //      this.name = "Hi Sunil Nayak";
                //    debugger;

                //    //you now have access to parentDirectCtrl.variable
                //}
                scope: {
                    
                    myname: '='
                },
                compile: function (tElem, tAttrs) {
                   
                    return {
                        //pre: function (scope, iElem, iAttrs) {
                        //    console.log(name + ': pre link => ' + iElem.html());
                        //},
                        post: function (scope, iElem, iAttrs) {
                            //console.log(name + ': post link => ' + iElem.html());
                            debugger;
                            scope.myname = "Itishree Nayak";
                        }
                    }
                }
            };
        })
        .directive('childDirective', function () {
            return {
                restrict: 'E',
                template: '<h1>I am child of {{myname}}</h1>',
                // replace: true,
              //  require: '^parentDirective',
                //link: function ($scope, $element, attr, lhb) {
                //    $scope.myname = lhb.name;
                //    debugger;

                //    //you now have access to parentDirectCtrl.variable
                //}

                link: {

                    pre: function ($scope, $element, attr, lhb) {
                        debugger;
                    $scope.myname = "Sunil Nayak";
                   

                    //you now have access to parentDirectCtrl.variable
                }

                    //post: function (scope, elem, attr) {
                    //    debugger;
                    //    scope.name = "sunil";
                    //}
                }
            }
        })
        .directive('son', function () {
            return {
                restrict: 'EA',
                template: '<div class="son">{{sonSays}}</div>',
                link: function (scope, elem, attr) {
                    scope.sonSays = 'Hey, I am son, and my dad is ' + scope.name;
                }
            };
        })
        .directive('dad', function () {
            return {
                restrict: 'EA',
                template: '<div class="dad">{{greeting}}{{name}}' +
                    '<son></son>' +
                    '</div>',
                link: {

                    pre: function (scope, elem, attr) {

                        scope.name = 'Paul';
                        scope.greeting = 'Hey, I am ';
                    }

                    //post: function (scope, elem, attr) {
                    //    debugger;
                    //    scope.name = "sunil";
                    //}
                }
            };
        });
        // This can be further enhanced to include more messages.;

}(angular, jQuery));