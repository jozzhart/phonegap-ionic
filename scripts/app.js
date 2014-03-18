var app = angular.module('app', ['ui.router', 'ionic', 'ngSanitize'])
  .config(function ($stateProvider, $urlRouterProvider) {
    // $routeProvider
    //   .when('/', {
    //     templateUrl: 'views/main.html',
    //     controller: 'MainCtrl'
    //   })
    //   .when('/login', {
    //     templateUrl: 'views/login.html',
    //     controller: 'LoginCtrl'
    //   })
    //   .when('/main', {
    //     templateUrl: 'views/main.html',
    //     controller: 'MainCtrl'
    //   })      
    //   .when('/board/new', {
    //     templateUrl: 'views/board.new.html',
    //     controller: 'BoardNewCtrl'
    //   })
    //   .when('/board/:boardId', {
    //     templateUrl: 'views/main.html',
    //     controller: 'MainCtrl'
    //   });

      $urlRouterProvider.otherwise("/");
      $stateProvider
        .state('main', {
          url: "",
          abstract: true,
          templateUrl: "views/event-menu.html"
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
        .state('main.checkin', {
          url: "/check-in",
          views: {
            'menuContent' :{
              templateUrl: "views/check-in.html"
            }
          }
        })
        .state('main.attendees', {
          url: "/attendees",
          views: {
            'menuContent' :{
              templateUrl: "views/attendees.html"
            }
          }
        });
        console.log('hola')
  });

app.run(function($rootScope) {
  $rootScope.globals = {};
});