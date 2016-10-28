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

  .controller('ChatDetailCtrl', function($scope, $stateParams, Chats,  $ionicSideMenuDelegate) {

    $scope.toggleLeft = function() {
      $ionicSideMenuDelegate.toggleLeft();
    };


     $scope.chat = Chats.get($stateParams.chatId);
     $scope.chatView = {};
     var lastText = $scope.chat.lastText;
     console.log($scope.chat);
    // $scope.chatView.message =  {id: 'string', text: 'string', userId: 'string', date: '1455120273886'};
    // $scope.chatView.you =  {userId: 'test', avatar: 'img/adam.jpg', userName: 'hello'};

    var vm = this;
    vm.you = {
      userId: '4562KDJYE72930DST283DFY202Dd',
      avatar: $scope.chat.face,
      userName: $scope.chat.name
    };
    vm.messages = [{
        id: '535d625f898df4e80e2a125e',
        text: '안녕하세요!.',
        userId: 'hilsqdhfods5990K226DHS01NOHoh',
        avatar: 'http://polyligne.be/wp-content/uploads/2014/06/Man_Avatar.gif',
        date: '1455110273886'
      },{
      id: '547643aeab43d1d4113abfd4',
      text: lastText,
      userId: '4562KDJYE72930DST283DFY202Dd',
      avatar: 'http://polyligne.be/wp-content/uploads/2014/06/Man_Avatar.gif',
      date: '1455110273886'
  }];


    vm.sendFunction = function (message) {
      console.log('sendMessage : '+message);
    };

    vm.sendMessage = function(message) {
      console.log('sendMessage : '+message);
      // var d = new Date();
      // vm.messages.push({
      //   id:'',
      //   text:message,
      //   userId: vm.userId,
      //   avater: vm.avater,
      //   date:'1455110483886'
      // });
    };

    $scope.chatView = vm;

    $scope.$on('simple-chat-message-posted', function() {
      console.log('onMessagePosted');
    });

  });
