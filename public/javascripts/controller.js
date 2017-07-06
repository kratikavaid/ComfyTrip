/*angular.module('datepickerBasicUsage', ['ngMaterial', 'ngMessages']).controller('AppCtrl', function() {
  this.myDate = new Date();
  this.isOpen = false;
});*/
var app = angular.module('firstApplication', ['ngMaterial','ngMessages','ngRoute']);



 app.config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/login', {
          templateUrl: 'login.html',
          controller: 'dateController'
        }).
        when('/getPlaces', {
          templateUrl: 'places.html',
          controller: 'dateController'
        }).
        otherwise('/login');
    }
  ]);


 app.controller('dateController', function($rootScope, $scope, $location,$http) {
 

        $scope.myDate = new Date();
        $scope.minDate = new Date(
           $scope.myDate.getFullYear(),
           $scope.myDate.getMonth(),
           $scope.myDate.getDate());
        $scope.maxDate = new Date(
           $scope.myDate.getFullYear(),
           $scope.myDate.getMonth() + 12,
           $scope.myDate.getDate());
        $scope.onlyWeekendsPredicate = function(date) {
           var day = date.getDay();
           return day === 0 || day === 6;
        }

        $scope.findPlaces= function(){

           console.log("inside findPlaces");
           var data = {
             fromDate : $scope.fromDate,
             toDate :$scope.toDate,
             temp :$scope.temp
           }

           $http.post("/getPlaces",data)
           .then(function(response) {
              // $scope.places = response.data;
              $rootScope.places = response.data;
              console.log( $rootScope.places);
              $location.path("/getPlaces"); 
           });
         }
         // $scope.findPlaces();
     });