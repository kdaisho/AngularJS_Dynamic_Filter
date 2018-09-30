var table = angular.module('table', []);

table.controller('TableController', function TableController($scope) {
    $scope.list = [{
        id: 1,
        name: 'Nexus S',
        description: 'Fast just got faster with Nexus S',
        duration: 30
    }, {
        id: 2,
        name: 'Motorola XOOM™ with Wi-Fi',
        description: 'The Next, Next Generation tablet',
        duration: 10
    }, {
        id: 3,
        name: 'Samsung Glaxy',
        description: 'Slow and Explosive Negative Legacy',
        duration: 90
    }, {
        id: 4,
        name: 'Samsung Glaxy',
        description: 'Slow and Explosive Negative Legacy',
        duration: 40
    }, {
        id: 5,
        name: 'Samsung Glaxy',
        description: 'Slow and Explosive Negative Legacy',
        duration: 120
    }];

    $scope.flist = [
        {name: 'Fast'},
        {name: 'Slow'},
        {name: 'Slow'},
        {name: 'Slow'},
        {name: 'Slow'},
        {name: 'X'}
    ];

    $scope.reset = function() {
        console.log('reset fired');
        var options = document.querySelectorAll('#fwindow option');
        for (let i = 0; i < options.length; i++) {
            options[i].selected = options[i].defaultSelected;
        }
        $scope.desc = {};
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