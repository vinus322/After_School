
/**
 * Created by tjssm on 2016. 8. 7..
 */

angular.module('starter.todoControllers',[])

  .controller('TodoCtrl',function ($scope,$ionicPopup,TodoDBA) {
    $scope.events = TodoDBA.getAllEvents();

    $scope.eventClick = function(event){
      $scope.date = event;
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

  });

