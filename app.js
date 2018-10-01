var table = angular.module('table', []);

table.controller('TableController', function TableController($scope) {
    // $scope.list = [{
    //     id: 1,
    //     name: 'Nexus S',
    //     description: 'Fast just got faster with Nexus S',
    //     genre: 'Electronics',
    //     duration: 30
    // }, {
    //     id: 2,
    //     name: 'Motorola XOOM™ with Wi-Fi',
    //     description: 'The Next, Next Generation tablet',
    //     genre: 'Electronics',
    //     duration: 10
    // }, {
    //     id: 3,
    //     name: 'Samsung Glaxy',
    //     description: 'Slow and Explosive Negative Legacy',
    //     genre: 'Organic',
    //     duration: 90
    // }, {
    //     id: 4,
    //     name: 'Samsung Glaxy',
    //     description: 'Slow and Explosive Negative Legacy',
    //     genre: 'Organic',
    //     duration: 40
    // }, {
    //     id: 5,
    //     name: 'Samsung Glaxy',
    //     description: 'Slow and Explosive Negative Legacy',
    //     genre: 'Gas Operated',
    //     duration: 120
    // }];

    $scope.list = [];

    $scope.flist = [];

    $scope.reset = function(list) {
        var options = document.querySelectorAll('#fwindow option');
        for (let i = 0; i < options.length; i++) {
            options[i].selected = options[i].defaultSelected;
        }
        $scope.desc = {};
    };

    var table = document.getElementById('table');
    var alreadyHas = false;
    $scope.getSelect = function(list, index) {
        console.log('getSelect ' + index);
        $scope.filtering = true;
        var fwindow = document.getElementById('fwindow');
        table.rows[0].cells[index].appendChild(fwindow);
        fwindow.classList.add('absolute');
        $scope.getFilterItems(list, index);
    };

    $scope.getFilterItems = function(list, index) {
        // if (alreadyHas) return;
        console.log('getFil ' + index);
        list.length = 0;
        var arr = [];
        var rows = table.rows;
        for (let i = 1; i < rows.length; i++) {
            var a = rows[i].cells[index].textContent;
            arr.push(a);
        }
        console.log(arr);
        console.log(list);
        // list[1] = arr;
        list.push.apply(list, arr);
        console.log(list);
        // alreadyHas = true;
        // return arr;
    };

    $scope.filtering = false;

    //Ajax
    var typingTimer;
    var doneInterval = 2000;
    var myInput = document.getElementById('query');

    myInput.addEventListener('keyup', function() {
        clearTimeout(typingTimer);
        if (myInput.value) {
            console.log('keyup fired');
            typingTimer = setTimeout(
                callAjax('data.json', function(data) {
                    $scope.list = data;
                    console.log($scope.list);
                }),
                doneInterval
            );
        }
    });

    function callAjax(url, callback) {
        return function() {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                console.log('ajax called');
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    try {
                        var data = JSON.parse(xhttp.responseText);
                        console.log('DATA: ' + data);
                    }
                    catch(error) {
                        console.log(error.message + ' in ' + xhttp.responseText);
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
        var hashCheck = {}, newItems = [];

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