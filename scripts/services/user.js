angular.module('app').service('UserService', function($http) {
  this.create = function(creds, callback) {
    $http.post('/api/user', creds)
    .success(function(data) {
      callback(null, data);
    })
    .error(function(err) {
      callback(err);
    });
  };

  this.get = function(callback) {
    $http.get('/api/user')
    .success(function(data) {
      callback(null, data);
    })
    .error(function(err) {
      callback(err);
    });
  };

  this.login = function(creds) {
    $http.post('/api/user/login')
    .success(function(data) {
      console.log(data);
    })
    .error(function(data) {
      console.log(data);
    });
  };

  return this;
});