/**
 * Created by ShahinPro on 7/4/15.
 */
/**
 * Created by C-Styles on 5/23/15.
 */

/**
 *  @author Alex Vitari alexnoise79@gmail.com
 *  @description this module contains two directives which permits to validate and show labels through the floating label pattern.
 *  @global messages is a collection of labels to simplify the import from locale variables
 *  @see https://github.com/angular/bower-angular-i18n for details
 */

'use strict';

angular.module('ngFloatingLabels', ['ngAnimate'])
    .directive("floatingValidation", ['$animate', function ($animate) {

        return {
            scope: true,
            require: ['^form', 'ngModel'],
            restrict: "A",
            link: function (scope, element, attrs, controller) {
                scope.formCtrl = controller[0];
                scope.inputCtrl = controller[1];

                var $float = jQuery('<label for="' + attrs.id + '" class="float">' + attrs.placeholder + '</span>');

                scope.showHide = function (show) {
                    if (show) {
                        if (!$float.hasClass('top')) {
                            element.after($float);
                            $animate.addClass($float, 'top');
                        }
                    } else {
                        $animate.removeClass($float, 'top');
                    }
                };

                scope.showErrors = function () {
                    angular.forEach(scope.inputCtrl.$error, function (e, i) {
                        if (e) {
                            $float.text(messages[i].replace("@value@", attrs[i]));
                        }
                    });
                    scope.showHide(true);
                };

                scope.$watch('inputCtrl.$error', function (newValue) {
                    if (JSON.stringify(newValue) !== '{}' && !scope.inputCtrl.$pristine) {
                        scope.showErrors();
                    }
                }, true);

                scope.$watch('inputCtrl.$valid', function (newValue) {
                    if (newValue && !scope.inputCtrl.$pristine) {
                        $float.text(attrs.placeholder);
                        scope.showHide(true);
                    }
                });

                scope.$watch('inputCtrl.$pristine', function (newValue) {
                    if (newValue && scope.inputCtrl.$touched) {
                        scope.showHide(false);
                        scope.inputCtrl.$setUntouched();
                        //immediately reset no debounce
                        scope.inputCtrl.$setViewValue(undefined, scope.inputCtrl.$options.updateOn);
                        scope.inputCtrl.$setPristine();
                    }
                });

                scope.$watch('formCtrl.$submitted', function (newValue) {
                    if (newValue && scope.inputCtrl.$invalid) {
                        scope.showErrors();
                    } else if (!scope.inputCtrl.$dirty) {
                        //reset if filled void
                        scope.showHide(false);
                    }
                });
            }
        };
    }])
    .directive("floatingLabel", ['$animate', function ($animate) {
        return {
            scope: true,
            require: 'ngModel',
            restrict: "A",
            link: function (scope, element, attrs, controller) {
                scope.inputCtrl = controller;

                var $float = jQuery('<label for="' + attrs.id + '" class="float">' + attrs.placeholder + '</span>');

                scope.showHide = function (show) {
                    if (show) {
                        if (!$float.hasClass('top')) {
                            element.after($float);
                            $animate.addClass($float, 'top');
                        }
                    } else {
                        $animate.removeClass($float, 'top');
                    }
                };

                scope.$watch('inputCtrl.$modelValue', function (newValue) {
                    if (newValue !== undefined) {
                        scope.showHide(newValue.length);

                        if (!newValue.length) {
                            scope.inputCtrl.$setPristine();
                        }
                    }
                });

                scope.$watch('inputCtrl.$pristine', function (newValue) {
                    if (newValue && scope.inputCtrl.$touched) {
                        scope.showHide(false);
                        scope.inputCtrl.$setUntouched();
                        //immediately reset no debounce
                        scope.inputCtrl.$setViewValue(undefined, scope.inputCtrl.$options.updateOn);
                        scope.inputCtrl.$setPristine();
                    }
                });
            }
        };
    }]);


/**
 *  @author Alex Vitari alexnoise79@gmail.com
 *  @description this is an example scope to launch the ngFloatingLabels module.
 *  @requires https://github.com/alexnoise79/ngFloatingLabels
 *  @global messages is a collection of labels to simplify the import from locale variables
 *  @see https://github.com/angular/bower-angular-i18n for details
 */




/*messages could be localized see i18n for angular*/
var messages = {
    isPhoneformat:'this is an invalid phone format',
    phoneTooManyNumbers:'there are too many numbers',
    phoneNotEnoughNumbers:'there are not enough numbers',
    phoneLastFourAreNotNums:'The last 4 digits are not numbers',
    required: "this field is required",
    minlength: "min length of @value@ characters",
    maxlength: "max length of @value@ characters",
    pattern: "don\'t match the pattern",
    custom:"invalid type @value@",
    "email": "mail address not valid",
    "number": "insert only numbers",
    ssn: "acceptable formats: xxx-xx-xxxx OR xxxxxxxxx",
    phone: "that is not an acceptable phone number",
    restrictNumbers: "there must be exactly  @value@ numbers",
    "async": "async not valid type \"@value@\""
};

(function(){
    angular.module('floatingLabels', ['ngFloatingLabels'])
        .directive('slickValidator', function () {
            return {
                require: 'ngModel',
                link: function (scope, element, attrs, ngModel) {
                    ngModel.$validators.restrictNumbers = function (inputString) {
                        if (inputString) {
                            var validationArgs = {
                                inputString: inputString,
                                falseIf: '!=',
                                desiredNums: 9,
                                callbackFn: falseIfTrue
                            };
                            return numNums(validationArgs);
                        }

                    }
                }
            }
        })
        .directive('ssnValidator', function () {
            return {
                require: 'ngModel',
                link: function (scope, element, attrs, ngModel) {
                    ngModel.$validators.ssn = function (value) {

                        return /[0-9]{3}[-]*[0-9]{2}[-]*[0-9]{4}/.test(value);
                    };
                }
            };
        })
        .directive('isValidPhoneNumber', function () {
            return {
                require: 'ngModel',
                link: function (scope, element, attrs, ngModel) {


                    ngModel.$validators.isPhoneformat = function (value) {
                        var isValid = false;
                        if(/^[(]{1}[ 0-9]+[)]{1}[ 0-9]+[-]?[ 0-9]+$/.test(value)){
                            isValid = true;
                        }
                        else if(/^[0-9]{10}/.test(value)){
                            isValid = true;
                        }
                        else if(/^.*[0-9]{3}.*[0-9]{3}.*[0-9]{4}$/.test(value)){
                            isValid = true;
                        }
                        return isValid;
                    };

                    ngModel.$validators.phoneTooManyNumbers = function (inputString) {
                        if (inputString) {
                            var validationArgs = {
                                inputString: inputString,
                                falseIf: '>',
                                desiredNums: 10,
                                callbackFn: falseIfTrue
                            };
                            return numNums(validationArgs);
                        }
                    };
                    ngModel.$validators.phoneNotEnoughNumbers = function (inputString) {
                        if (inputString) {
                            var validationArgs = {
                                inputString:inputString,
                                falseIf:'<',
                                desiredNums:10,
                                callbackFn: falseIfTrue
                            };
                            return numNums(validationArgs);
                        }

                    };
                    ngModel.$validators.phoneLastFourAreNotNums = function (value) {
                        if(value){
                            return /.*[0-9]{4}$/.test(value);
                        }
                    }
                }
            };
        })
        .service('$fakeValidationService', ['$q', function ($q) {
            return {
                "get": function (value) {
                    var deferred = $q.defer();

                    setTimeout(function () {
                        if (value === "bar") {
                            deferred.resolve({valid: true});
                        } else {
                            deferred.reject({valid: false});
                        }
                    }, 3000);

                    return deferred.promise;
                }
            }
        }])
        .directive('asyncValidator', ['$fakeValidationService', '$q', function ($fakeValidationService, $q) {
            return {
                require: 'ngModel',
                link: function ($scope, element, attrs, ngModel) {
                    ngModel.$asyncValidators.async = function (modelValue, viewValue) {
                        var value = modelValue || viewValue;
                        if (value.length) {
                            element.before('<i class="icon-spin icon-refresh"></i>').parent().addClass('spinner');

                            return $fakeValidationService.get(value).then(function (response) {
                                element.parent().removeClass('spinner').find('i').remove();
                                return true;
                            }, function (response) {
                                element.parent().removeClass('spinner').find('i').remove();
                                if (!response.valid) {
                                    return $q.reject();
                                }
                            });
                        }
                    };
                }
            }
        }]);

    function countNumbersInString(string){
        var count = 0;
        var stringArray = string.split('');
        var length = string.length;
        for (var char in stringArray) {
            if (/[0-9]{1}/.test(stringArray[char])) {
                count++
            }
        }
        return count;
    }
    function isgreaterthan(number) {
        alert(number);
    };
    function falseIfTrue(subject, operator, compared) {
        var result;
        switch (operator) {
            case '<':
                result = (subject < compared);
                break;
            case '>':
                result = (subject > compared);
                break;
            case '==':
                result = (subject == compared);
                break;
            case '!=':
                result = (subject != compared);
                break;
        }
        return !result;
    }
    function numNums(obj) {
        var numOfNums = countNumbersInString(obj.inputString);
        return obj.callbackFn(numOfNums, obj.falseIf, obj.desiredNums);

    };
})();