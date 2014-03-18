angular.module('app')
.controller('MainCtrl', function ($scope, $window, $document, EventService, $ionicSideMenuDelegate, $ionicPopup) {

  $scope.modal = {
    "title": "Quick Schedule"
  };

  $scope.leftButtons = [{
    type: 'button-icon button-clear ion-navicon',
    tap: function(e) {
      $ionicSideMenuDelegate.toggleLeft($scope);
    }
  }];

  $scope.newEvent = {};

  $scope.selectedLocation;

  $scope.locations = [
    {value: 'Home', label: '<i class="fa fa-home"></i> Home'},
    {value: 'Work', label: '<i class="fa fa-file"></i> Work'},
    {value: 'ScooterBar', label: '<i class="fa fa-map-marker"></i> Scooter Bar'},
    {value: 'Cafe', label: '<i class="fa fa-map-marker"></i> Cafe Del Marsh'},
    {value: 'Other', label: '<i class="fa fa-globe"></i> Other'}
  ];

  EventService.getEvents()
  .then(function(events) {
    angular.element('#calendar').fullCalendar( 'addEventSource', events);
  });



  $scope.showModal = function(start, end, allDay) {

    $ionicPopup.show({
      templateUrl: 'views/modals/quickSchedule.tpl.html',
      title: 'xxxxxx',
      scope: $scope,
      buttons: [
        { 
          text: 'Cancel', onTap: function(e) { 
            return {
              confirm: false
            }; 
          } 
        },
        {
          text: '<b>Save</b>',
          type: 'button-positive',
          onTap: function(e) {
            return {
              confirm: true,
              event: {
                start: start.format('X')*1000,
                end: end.format('X')*1000,
                allDay: false,
                location: 'home'
              }
            }; 
          }
        },
      ]
    }).then(
      function(res) {
        if(res.confirm === true) {
          saveEvent(res.event);
        }
      });
  };




  $scope.eventResize = function(event) {
    EventService.updateEvent(event)
    .then(function(event) {});
  };


  var saveEvent = function(event) {
    EventService.saveEvent(event)
    .then(function(event) {
      console.log(event);
    });
  }

  $scope.$on('$viewContentLoaded', function(){
      var calendar = angular.element('#calendar').fullCalendar({
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month,agendaWeek,agendaDay'
        },
        defaultView: 'agendaWeek',
        selectable: true,
        firstDay: 1,
        selectHelper: true,
        select: createEvent,
        eventResize: updateEvent,
        eventDrop: updateEvent,
        editable: true,
        minTime: '7:00',
        events: []
      });
    
  })



  function createEvent(start, end, allDay) {
    $scope.showModal(start, end, allDay);
  }

  function updateEvent(event, jsEvent, ui, view) {
    $scope.eventResize(event);
  }




});
