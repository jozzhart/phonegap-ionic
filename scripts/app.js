var app = angular.module('app', ['ui.router', 'ionic', 'ngSanitize'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");
    $stateProvider
    .state('main', {
      url: "",
      abstract: true,
      templateUrl: "views/menu.html"
    })
    .state('main.home', {
      url: "/",
      views: {
        'menuContent' :{
          templateUrl: "views/main.html",
          controller: 'MainCtrl'
        }
      }
    })
  });

app.run(function($rootScope) {
  $rootScope.globals = {};
});