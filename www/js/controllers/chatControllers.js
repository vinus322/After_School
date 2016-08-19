/**
 * Created by kimmin-young on 2016. 8. 4..
 */
angular.module('starter.chatControllers', [])
  .controller('ChatsCtrl', function($scope,$http, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();

    var dataObject = {
      uemail:'qsdesa322',
      upasswd:'12345678'
    };

    $scope.remove = function(chat) {
      Chats.remove(chat);
    };
  })

  .controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);





  });
