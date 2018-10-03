var table = angular.module('table', []);

table.controller('TableController', function TableController($scope) {
    $scope.list = [];

    $scope.flist = [];

    $scope.defaultText = 'Choose here';

    var table = document.getElementById('table');
    var alreadyHas = true;
    $scope.getSelect = function (list, index) {
        console.log('FLIST ' + list);
        if (index == 2) $scope.filtering2 = true;
        if (index == 3) $scope.filtering3 = true;
        var fwindow = document.getElementById('fwindow');
        // table.rows[0].cells[index].appendChild(fwindow);
        $scope.getFilterItems(list, index);
    };

    $scope.changeText = function () {
        if (alreadyHas) {
            $scope.defaultText = 'Reset Filter';
            alreadyHas = false;
        } else {
            $scope.defaultText = 'Choose here';
            alreadyHas = true;
        }
    }

    $scope.getFilterItems = function (list, index) {
        console.log('my index', index);
        list.length = 0;
        var arr = [];
        var rows = table.rows;
        for (let i = 1; i < rows.length; i++) {
            var a = rows[i].cells[index].textContent;
            arr.push(a);
        }
        list.push.apply(list, arr);
    };

    $scope.filtering = false;

    //Ajax
    var typingTimer;
    // var doneInterval = 2000;
    var doneInterval = 100;
    var myInput = document.getElementById('query');

    myInput.addEventListener('keyup', function () {
        clearTimeout(typingTimer);
        if (myInput.value) {
            typingTimer = setTimeout(
                callAjax('data.json', function (data) {
                    $scope.list = data;
                }),
                doneInterval
            );
        }
    });

    $scope.addBoarder = function(event) {
        event.target.style.border = '1px solid #ccc';
    };

    $scope.removeBoarder = function(event) {
        event.target.style.border = 'none';
    };

    function callAjax(url, callback) {
        return function () {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    try {
                        var data = JSON.parse(xhttp.responseText);
                    } catch (error) {
                        return;
                    }
                    callback(data);
                }
            };

            xhttp.open('GET', url, true);
            xhttp.send();
        }
    }
});


/**
 * Filters out all duplicate items from an array by checking the specified key
 * @param [key] {string} the name of the attribute of each object to compare for uniqueness
 if the key is empty, the entire object will be compared
 if the key === false then no filtering will be performed
 * @return {array}
 */
angular.module('table').filter('unique', function () {

    return function (items, filterOn) {

        if (filterOn === false) {
            return items;
        }

        if ((filterOn || angular.isUndefined(filterOn)) && angular.isArray(items)) {
            var hashCheck = {},
                newItems = [];

            var extractValueToCompare = function (item) {
                if (angular.isObject(item) && angular.isString(filterOn)) {
                    return item[filterOn];
                } else {
                    return item;
                }
            };

            angular.forEach(items, function (item) {
                var valueToCheck, isDuplicate = false;

                for (var i = 0; i < newItems.length; i++) {
                    if (angular.equals(extractValueToCompare(newItems[i]), extractValueToCompare(item))) {
                        isDuplicate = true;
                        break;
                    }
                }
                if (!isDuplicate) {
                    newItems.push(item);
                }

            });
            items = newItems;
        }
        return items;
    };
});

angular.module('table').filter('mydesc', function () {
    return function(item, arr) {
        if (!arr) {
            console.log('no more');
            return item;
        }
        var out = [];

        // console.log(arr);
        angular.forEach(item, function(item) {
            for (let i = 0; i < arr.length; i++) {
                if (item.description == arr[i] || item.genre == arr[i]) {
                    console.log(item);
                    out.push(item);
                }
            }
        });
        return out;
    }
});