'use strict';

var countryApp = angular.module('countryApp', [
  'ngRoute',
  'countryControllers',
  'countriesDirective',
  'countriesFactory',
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
