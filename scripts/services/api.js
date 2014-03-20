'use strict';

angular.module('app')
.factory('APIService', function ($http, $q) {

  var url = 'http://comrades.jozzhart.com:8000';

  var onError = function(err) {

    return {};
    console.log(err)
    $rootScope.errorMessage = 'Error ' + err.data + ' ' + err.status;

    if(err.status === 0) {
      $rootScope.errorMessage = 'Could not connect to gloss API.';
    }
  };

  return {
  }
});

