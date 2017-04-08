var countriesDirective = angular.module('countriesDirective', []);


countriesDirective.directive('country', function () {
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
  }}
});
