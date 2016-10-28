/**
 * Created by kimmin-young on 2016. 8. 8..
 */
angular.module('starter.testController',[])

  .controller('NavCtrl', function($scope, $ionicSideMenuDelegate) {
    $scope.showMenu = function () {
      $ionicSideMenuDelegate.toggleLeft();
    };
    $scope.showRightMenu = function () {
      $ionicSideMenuDelegate.toggleRight();
    };
  })

.controller('TESTCTRL', function ($scope, $state,$rootScope, $ionicUser, $ionicPush) {

  $scope.identifyUser= function () {
    var user = $ionicUser.get();
    if(!user.user_id){
      user.user_id = $ionicUser.generateGUID();
    }

    angular.extend(user,{
      name: 'kim',
      bio:'Author of Devactic'
    });

    $ionicUser.identify(user).then(function () {
      $scope.idenfied = true;
      console.log('name:'+user.name+'--- id:'+user.user_id);
    })
  }

});
