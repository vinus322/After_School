/**
 * Created by tjssm on 2016. 8. 11..
 */



angular.module('starter.addControllers',[])

    .controller('AddCtrl',function ($scope,$state,$ionicPopup,TodoDBA,$stateParams) {

      $scope.event ={};


      $scope.showPopup = function(check) {
        $scope.data = {};
        var myPopup = $ionicPopup.show({
          template:
          '<label class="itme item-input">'+
          '<span class="input-label">일자</span>'+
          '<input type="date" ng-model="data.date">'+ '<br>'+'</label>'+
          '<label class="itme item-input">'+
          '<span class="input-label">시간</span>'+
          '<input type="time" placeholder="시간" ng-model="date.date">'+'</label>'
          ,
          title: '날짜입력',
          scope: $scope,
          buttons: [
            { text: 'Cancel' },
            {
              text: '<b>Save</b>',
              type: 'button-positive',
              onTap: function(e) {
                if (!$scope.data.date) {
                  e.preventDefault();
                } else {
                  return $scope.data.date;
                }
              }
            }
          ]
        });

        myPopup.then(function(res) {
          console.log('Tapped!', res);
          if(check==1){
            $scope.event.start = res;
          }else{
            $scope.event.end = res;
          }
        });

        $timeout(function() {
          myPopup.close();
        }, 3000);
      };




      $scope.event.user_id='1';
      $scope.saveEvent = function () {
        var keys = ["title", "start","end"];
        for (var key in keys) {

          if (typeof $scope.event[keys[key]] == '' ||typeof $scope.event[keys[key]] == 'undefined' ) {
            $ionicPopup.alert({
              title: '알림',
              template: "일정을 채워주세요!"
            });
            return;
          }
        }
        var inputData = {};
        inputData = $scope.event;
        TodoDBA.saveEvents(inputData);
        $scope.event ={};
        $state.go('tab.calendar', {}, {reload: true});
      }

    });
