var table = angular.module('table', []);

table.controller('TableController', function TableController($scope) {
    $scope.list = [{
        id: 1,
        name: 'Nexus S',
        description: 'Fast just got faster with Nexus S',
        genre: 'Electronics',
        duration: 30
    }, {
        id: 2,
        name: 'Motorola XOOM™ with Wi-Fi',
        description: 'The Next, Next Generation tablet',
        genre: 'Electronics',
        duration: 10
    }, {
        id: 3,
        name: 'Samsung Glaxy',
        description: 'Slow and Explosive Negative Legacy',
        genre: 'Organic',
        duration: 90
    }, {
        id: 4,
        name: 'Samsung Glaxy',
        description: 'Slow and Explosive Negative Legacy',
        genre: 'Organic',
        duration: 40
    }, {
        id: 5,
        name: 'Samsung Glaxy',
        description: 'Slow and Explosive Negative Legacy',
        genre: 'Gas Operated',
        duration: 120
    }];

    $scope.flist = [];
    // console.log($scope.flist);
    // $scope.flist = ['ha', 'hi'];
    // console.log($scope.flist);


    $scope.reset = function(list) {
        console.log('reset fired');
        // list.length = 0;
        var options = document.querySelectorAll('#fwindow option');
        for (let i = 0; i < options.length; i++) {
            options[i].selected = options[i].defaultSelected;
        }
        $scope.desc = {};
    }
    var table = document.getElementById('table');

    $scope.getFilterItems = function(list, index) {
        list.length = 0;
        if (list.length >= 1) {
            console.log('list exists ' + list);
            // $scope.flist = [];
        }
        var arr = [];

        var rows = table.rows;
        // console.log('rows: ' + rows);
        // console.log(rows[1].cells[2].textContent);
        for (let i = 1; i < rows.length; i++) {
            var a = rows[i].cells[index].textContent;
            arr.push(a);
        }
        console.log(arr);
        console.log(list);
        // list[1] = arr;
        list.push.apply(list, arr);
        console.log(list);
        // return arr;
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