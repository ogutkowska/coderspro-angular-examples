'use strict';

var countryApp = angular.module('countryApp', [
  'ngRoute'
]);

countryApp.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'country-list.html',
      controller: 'CountryListCtrl'
    })
    .when('/:countryId', {
      templateUrl: 'country-detail.html',
      controller: 'CountryDetailCtrl'
    })
    .otherwise({
      redirect: '/'
    })
}]);

countryApp.factory('countries', ['$http', function ($http) {
  return {
    list: function (callback) {
      $http({
        method: 'GET',
        url: 'countries.json',
        cache: true
      }).success(callback);
    },
    find: function (id, callback) {
      $http({
        method: 'GET',
        url: 'country_' + id + '.json',
        cache: true
      }).success(callback)
    }
  };
}]);

countryApp.directive('country', function () {
  return{
    //A - <div moja-dyrekywa></div>
    //E - <moja-dyrektywa></moja-dyrekywa>
    //C -  - <div class="{ moja-dyrektywa: parametr}"
    //M - tworzenie dyrektywy poprzez komentarz  /*@ moja-dyrektywa */

  restrict: 'A',
  scope: {
    //two way data binding
    //one way data binding - <
    country: '='
  },
  templateUrl: 'country.html',
  controller: function($scope, countries){
  countries.find($scope.country.id, function (country){
    $scope.country.flag = country.flag;
  })
  }
  }
});

countryApp.controller('CountryListCtrl', ['$scope', 'countries',
  function ($scope, countries) {
    countries.list(function (countries) {
      $scope.countries = countries;
    })
  }]);

countryApp.controller('CountryDetailCtrl', ['$scope', '$routeParams', 'countries',
  function ($scope, $routeParams, countries) {
    countries.find($routeParams.countryId, function (country) {
      $scope.country = country;
    });

    $scope.goBack = function () {
      window.history.back();
    }
  }]);
