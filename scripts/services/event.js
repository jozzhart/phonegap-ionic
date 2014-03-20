'use strict';

angular.module('app')
.factory('EventService', function ($http, $q) {

  var url = 'http://comrades.jozzhart.com:8000/api';

  $http.defaults.headers.common.userId = '53234a30de1c4af9b1d6b0af';


  var onError = function(err) {
    return {};
    console.log(err)
    $rootScope.errorMessage = 'Error ' + err.data + ' ' + err.status;

    if(err.status === 0) {
      $rootScope.errorMessage = 'Could not connect to gloss API.';
    }
  };

  return {

    getEvents: function(){
      return $http({method: 'GET', url: url + '/event'}).
      then(function(response) {
        return response.data;
      }, onError);
    },

    saveEvent: function(event){
      return $http({method: 'POST', url: url + '/event', data: event }).
      then(function(response) {
        return response.data;
      }, onError);
    },

    updateEvent: function(event){
      return $http({method: 'PUT', url: url + '/event/' + event._id, data: event }).
      then(function(response) {
        return response.data;
      }, onError);
    },

    deleteEvent: function(event){
      return $http({method: 'DELETE', url: url + '/event/' + event._id }).
      then(function(response) {
        return response.data;
      }, onError);
    }
  }
});

