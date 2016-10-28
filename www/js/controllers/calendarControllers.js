angular.module('starter.calendarControllers', [])

  .controller('CalendarsCtrl', function($state, $scope ,$ionicPopup,$ionicPlatform, $ionicModal,$timeout, TodoDBA,$cordovaSQLite,$stateParams) {


    var vm = this;

    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();


    var firstname = "test";
    var lastname = "check";

    // var query = "INSERT INTO Todo (user_id,title,start,end,content ) VALUES (?,?,?,?,?)";
    // $cordovaSQLite.execute(db, query, ['1','test',new Date(y, m, d + 1, 19, 0), new Date(y, m, d + 1, 22, 30),'check']).then(function(res) {
    //   console.log("INSERT ID -> " + res.insertId);
    // }, function (err) {
    //   console.error(err);
    // });

    $scope.events = TodoDBA.getAllEvents();


    /* event source that calls a function on every view switch */
    $scope.eventsF = function (start, end, timezone, callback) {
      var s = new Date(start).getTime() / 1000;
      var e = new Date(end).getTime() / 1000;
      var m = new Date(start).getMonth();
      var events = [{title: 'Feed Me ' + m,start: s + (50000),end: s + (100000),allDay: false, className: ['customFeed']}];
      callback($scope.events);
    };

    /* event sources array*/
    $scope.eventSources = [$scope.events, $scope.eventsF];

    $scope.date={};
    $scope.alertOnEventClick = function( date, jsEvent, view){
      $scope.date = date;
      var myEventPopup = $ionicPopup.show({
        template: '<h3>{{date.title}}</h3>' +'<h4>{{date.content}}</h4>'+
        '<br>&nbsp&nbsp{{date.start}}&nbsp~&nbsp{{date.end}}',
        title: 'Evant',
        scope: $scope,
        buttons: [
          { text: '삭제' ,
            onTap: function(e) {
              return true;
            }
          },
          {
            text: '<b>확인</b>',
            type: 'button-positive'
          }
        ]});
      myEventPopup.then(function(res) {
        if(res){
          console.log('Tapped!', res);
          TodoDBA.deleteEvent($scope.date);

        }
      });

      $timeout(function() {
        myEventPopup.close(); //close the popup after 3 seconds for some reason
      }, 3000);
    };


    $scope.alertOnDrop = function(event, delta, revertFunc, jsEvent, ui, view){
      $scope.alertMessage = ('Event Droped to make dayDelta ' + delta);
    };

    $scope.alertOnResize = function(event, delta, revertFunc, jsEvent, ui, view ){
      $scope.alertMessage = ('Event Resized to make dayDelta ' + delta);
    };

    $scope.goAdd = function () {
      $state.transitionTo($state.current, $stateParams, {
        reload: true, inherit: false, notify: true
      });
      $state.go('add');
    }


    $scope.uiConfig = {
      calendar:{
        height: 450,
        editable: true,
        header:{
          right: 'today prev,next'
        },
        eventClick: $scope.alertOnEventClick,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize
      }
    };

  });
