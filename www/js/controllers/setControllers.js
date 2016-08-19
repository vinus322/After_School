/**
 * Created by kimmin-young on 2016. 8. 4..
 */

angular.module('starter.setControllers', [])

  .controller('AccountCtrl', function($state,$scope, $http, $ajax,$ionicPopup,$localstorage) {
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
    }


    $scope.settings = {
      enableFriends: true
    };
  });

