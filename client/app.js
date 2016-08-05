import angular from 'angular';
import 'angular-ui-router';
//import 'angular-material'; 
//import 'angular-animate';
// import 'angular-material-icons';

//var app = angular.module('app', ['ui.router', 'ngMaterial','ngMdIcons']);
var app = angular.module('app', ['ui.router', 'ngMaterial']);

app.config(($stateProvider, $urlRouterProvider) => {
	$urlRouterProvider.otherwise("/nav");

	$stateProvider
	.state('nav', { 
	  url:'/nav',
	  templateUrl: '/nav/nav.html' 
      })
});


app.controller('mainCtrl', function($scope) {

});

app.controller('AppCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.toggleLeft = buildDelayedToggler('left');
    $scope.toggleRight = buildToggler('right');
    $scope.isOpenRight = function(){
      return $mdSidenav('right').isOpen();
    };
    $scope.isOpenRight = true;
     /**
     * Supplies a function that will continue to operate until the
     * time is up.
     */
    function debounce(func, wait, context) {
      var timer;
      return function debounced() {
        var context = $scope,
            args = Array.prototype.slice.call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function() {
          timer = undefined;
          func.apply(context, args);
        }, wait || 10);
      };
    }
    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildDelayedToggler(navID) {
      return debounce(function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }, 200);
    }
    function buildToggler(navID) {
      return function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }
    }
  });

app.controller('addressEditCtrl', function($scope, $http) {
    $http.get("/propertyTypes").then((response) => {
    	$scope.items = response.data;
    });

});


app.controller('RightCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav('right').close()
        .then(function () {
          $log.debug("close RIGHT is done");
        });
    };
  });