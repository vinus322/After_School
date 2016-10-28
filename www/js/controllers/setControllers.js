/**
 * Created by kimmin-young on 2016. 8. 4..
 */

angular.module('starter.setControllers', [])



  .controller('AccountCtrl', function($state,$scope, $http, $ajax,$ionicPopup,$localstorage, Class) {

    $scope.logout = function () {
      $ajax.logout(function (res) {
        if(res.result){
          $ionicPopup.alert({
            template: "로그아웃되었습니다."
          });
          $state.go('signIn');
        }
      });
      $scope.autoLoginSetting = function () {
        var UserInfo = $localstorage.getObject('UserInfo');
        UserInfo.autoLogin = $scope.autoLogin.checked;
      }
    };

    $scope.Schools = [];

    Class.getSchool('1', function (res) {

      console.log("length "+res.length);
      for (var i=0; i<res.length; i++) {
        $scope.Schools[i] = {
          id : res[i].school_id,
          name: res[i].school_name,
          phone: res[i].school_phone_number,
          Class: []
        };

        console.log("check ClassPeople 2 = "+$scope.Schools[i].id);

        Class.getClass(i,'1',$scope.Schools[i].id, function (i,cres) {


          for (var j=0; j<cres.length; j++) {
            console.log("check ClassPeople 3"+cres[j].chatt_name);
            $scope.Schools[i].Class.push({
              id: cres[j].chatt_id,
              name: cres[j].chatt_name
              }
            );
          }

        });
      }
    });



    $scope.toggleSchool = function(school) {
      if ($scope.isSchoolShown(school)) {
        $scope.shownSchool = null;
      } else {
        $scope.shownSchool = school;
      }
    };
    $scope.isSchoolShown = function(school) {
      return $scope.shownSchool === school;
    };

    $scope.addItem = function (idx) {
      $scope.item={};
      var add = $ionicPopup.show({
        template:
        '<label class="item item-input">'+
        '<input type="text" placeholder="Name" ng-model="item.name">'+
        '</label>'+
        '<label class="item item-input">'+
        '<input type="text" placeholder="tel" ng-model="item.tel">'+
        '</label>',
        title: '학생 추가',
        scope: $scope,
        buttons: [
          { text: '취소'
          },
          {
            text: '<b>저장</b>',
            type: 'button-positive',
            onTap: function(e) {
              return true;
            }
          }
        ]})

      add.then(function (res) {
        if(res){
          console.log("check");
          $scope.Schools[idx].Class.push($scope.item);
        }
      });
    }

    $scope.addSchool = function () {
      $scope.group={};
      var add = $ionicPopup.show({
        template:
        '<label class="item item-input">'+
        '<input type="text" placeholder="First Name" ng-model="group.name">'+
        '</label>',
        title: '클래스 추가',
        scope: $scope,
        buttons: [
          { text: '취소'
          },
          {
            text: '<b>저장</b>',
            type: 'button-positive',
             onTap: function(e) {
              return true;
            }
          }
        ]});

      add.then(function (res) {
        if(res){
          console.log("check");
          $scope.group.items=[];
          $scope.Schools.push( $scope.group);
        }
      });
    }
  })

  .controller('ClassCtrl', function($state,$scope, $stateParams, $http, $ajax,$ionicPopup,Class, Chats){
    $scope.Users = [];
    $scope.Class=JSON.parse($stateParams.Class);
    Class.getClassPeople($scope.Class.id,'1', function (res) {
      $scope.Users = res;
    });
  })


  .controller('UserInfoCtrl', function($state,$scope, $stateParams, $http, $ajax,$ionicPopup,Class){
    $scope.Class=$stateParams.userId;
  });

