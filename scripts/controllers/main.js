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

  $scope.data = {
    selectedLocation : {}
  };

  $scope.locations = [
    {value: 'Home', latlong: ['1234231234','123412341234']},
    {value: 'Work', latlong: ['7777777','77777']},
    {value: 'ScooterBar', latlong: ['66666','66666']},
    {value: 'Cafe', latlong: ['88888888','8888888']},
    {value: 'Other', latlong: ['9999999','9999999999999']}
  ];

  EventService.getEvents()
  .then(function(events) {
    var events = _.map(events, function(event){
      event.title = event.location.name;
      return event;
    });
    angular.element('#calendar').fullCalendar( 'addEventSource', events);
  });



  $scope.showModal = function(start, end, allDay) {

    $ionicPopup.show({
      templateUrl: 'views/modals/quickSchedule.tpl.html',
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

            console.log($scope.data.selectedLocation);

            return {
              confirm: true,
              event: {
                start: start.format('X')*1000,
                end: end.format('X')*1000,
                allDay: false,
                location: {
                  name: $scope.data.selectedLocation.value,
                  latlong: $scope.data.selectedLocation.latlong
                }
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




  var eventResize = function(event) {
    EventService.updateEvent(event)
    .then(function(event) {});
  };

  var eventRemove = function(event) {
    EventService.deleteEvent(event)
    .then(function() {});
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
        eventClick: removeEvent,
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
    eventResize(event);
  }

  function removeEvent(event, jsEvent, ui, view) {
    eventRemove(event);
  }



});
