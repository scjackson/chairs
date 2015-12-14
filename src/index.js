var angular = require('angular');

// Configurable chairs and speed
var DEFAULT_NUMBER_OF_CHAIRS = 100;
var DEFAULT_SPEED_IN_MS = 50;

var chairsApp = angular.module('chairsApp', []);
chairsApp.controller('ChairsController', ['$scope', '$timeout', function($scope, $timeout) {

  // Initialize an array that will provide CSS styling to draw the circle of chairs and display
  // empty/non-empty chairs
  $scope.chairs = Array.apply(null, {length: DEFAULT_NUMBER_OF_CHAIRS}).map(function(x, index) {

    // This gets the angle of a given index in radians and assumes the first chair should be at
    // the 12 oclock position
    var angle = .5 * Math.PI + (index * (2 * Math.PI / DEFAULT_NUMBER_OF_CHAIRS));

    // Calculate offset from center of the containing div via the formula:
    // x = cx + r * cos(a)
    // y = cy + r * sin(a)
    // Note: since 100% is at the bottom of the circle and 0% at the top we need to flip the sign
    return {
      style: {
        left: 50 + -1 * 50 * Math.cos(angle) + '%',
        top: 50 + -1 * 50 * Math.sin(angle) + '%',
      },
    };
  });

  // Initialize an array that will keep track of non-removed chairs
  var remainingChairs = Array.apply(null, {length: DEFAULT_NUMBER_OF_CHAIRS}).map(function(val, index) {
    return index;
  });

  // Keep track of the index of current chair in the remaining remainingChairs array
  var index = 0;

  // Kepp track of the number of chairs to skip each iteration
  var stepSize = 0;

  /**
   * Remove a chair from the remaining chairs array and recurse until
   * there are none remaining
   */
  function removeChair() {
    if (remainingChairs.length > 1) {
      // Get the index of the next chair to remove
      index = (stepSize + index) % remainingChairs.length;

      // Set the style to indicate a chair has been removed
      $scope.chairs[remainingChairs[index]].style.opacity = .1;

      // Remove chair from the remainingChairs array
      remainingChairs.splice(index, 1);

      // Increment step size for the next go round
      stepSize += 1;

      // If we have more than one chair left (ie the survivor), continue removing chairs
      $timeout(removeChair, DEFAULT_SPEED_IN_MS);
    }
  }

  removeChair();
}]);
