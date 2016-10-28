// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in calendarControllers.js


var db = null;

angular.module('starter', [
  'ionic',
  'ngCordova',
  'ionic.service.core',
  'ionic.service.push',

  'ui.calendar',
  'starter.signControllers',
  'starter.chatControllers',

  'starter.setControllers',
  'starter.securityServices',
  'starter.services',

  'starter.testController',
   'starter.calendarControllers',
   'starter.todoControllers',
   'starter.addControllers',
   'starter.todoServies',
   'starter.calendarServices',

  'starter.ClassServices',
  'ajax',
  'ngStorage',
  'angular-simple-chat',

])

.run(function($ionicPlatform,$cordovaSQLite) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    if (window.cordova) {
      db = $cordovaSQLite.openDB({ name: "my.db" , location: 'default'});

    }else{
      db = window.openDatabase("my.db", '1', 'my', 1024 * 1024 * 100); // browser
   }
    $cordovaSQLite.execute(db,"DROP TABLE todo;");
    $cordovaSQLite.execute(db,"DROP TABLE users;");
    $cordovaSQLite.execute(db,"DROP TABLE school;");
    $cordovaSQLite.execute(db,"DROP TABLE chatt;");
    $cordovaSQLite.execute(db,"DROP TABLE guestList;");

    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS todo (td_id integer primary key, user_id text,title text, start text, end text, content text, alert Boolean)");
    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS users (user_id integer primary key, login_id text,phone_number text, user_name text, user_authority integer, user_subscription text, user_image text)");
    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS school (school_id integer primary key, school_name text,school_phone_number text)");
    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS chatt (chatt_id integer primary key, chatt_name text,chatt_host_id integer, school_id integer)");
    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS guestList (guestlist_id integer primary key, chatt_id integer, user_id integer)");

    var chats = [{
      id: 0, name: 'Ben Sparrow', lastText: 'You on your way?', face: 'img/ben.png'
    }, {
      id: 1, name: 'Max Lynx', lastText: 'Hey, it\'s me', face: 'img/max.png'
    }, {id: 2, name: 'Adam Bradleyson', lastText: 'I should buy a boat', face: 'img/adam.jpg'
    }, {
      id: 3, name: 'Perry Governor', lastText: 'Look at my mukluks!', face: 'img/perry.png'
    }, {id: 4, name: 'Mike Harrington', lastText: 'This is wicked good ice cream.', face: 'img/mike.png'
    }];

    var query = "INSERT INTO school (school_name ,school_phone_number) VALUES (?,?)";
    $cordovaSQLite.execute(db, query, ["chungbuck","010-0000-0000"]);

    query = "INSERT INTO users (login_id,phone_number,user_name, user_authority,user_subscription,user_image) VALUES (?,?,?,?,?,?)";
    for(var i=0;i <chats.length; i++) {
      $cordovaSQLite.execute(db, query, [chats[i].id,"000-0000-0000",chats[i].name,1,chats[i].lastText,chats[i].face]);
  }
    query = "INSERT INTO chatt (chatt_name,chatt_host_id,school_id) VALUES(?,?,?)";
    $cordovaSQLite.execute(db, query, ['test', 1,1]);
    $cordovaSQLite.execute(db, query, ['test2', 1,1]);


    query = "INSERT INTO guestList (chatt_id, user_id) VALUES(?,?)";
    $cordovaSQLite.execute(db, query, [1,2]);
    $cordovaSQLite.execute(db, query, [1,3]);
    $cordovaSQLite.execute(db, query, [1,4]);
    $cordovaSQLite.execute(db, query, [1,5]);

    $cordovaSQLite.execute(db, query, [2,3]);
    $cordovaSQLite.execute(db, query, [2,5]);

})
})



.config(['$ionicAppProvider','$stateProvider','$urlRouterProvider', function($ionicAppProvider,$stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in calendarControllers.js

  $ionicAppProvider.identify(
    {
      app_id:"cbcf3e30",
      api_key:"96f71f07c66e8e94d0359ebb5858af0e3397755880b1f0d6",
      dev_push: true
    });


  $stateProvider
  // setup an abstract state for the tabs directive
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'Page/tabs.html'
      //templateUrl: 'Page/menu.html'
    })

    .state('title', {
      url: '/title',
      templateUrl: 'Page/title.html',
      controller: 'TitleCtrl'
    })

    .state('test', {
      url: '/test',
      templateUrl: 'Page/test.html',
      controller:'TESTCTRL'
      //templateUrl: 'Page/tab-dash.html'
    })

    .state('signIn', {
      url: '/signIn',
      templateUrl: 'Page/User/signIn.html',
      controller:'SignInCtrl'
          //templateUrl: 'Page/tab-dash.html'
    })
    .state('signUp', {
      url: '/signUp',
      templateUrl: 'Page/User/signUp.html',
      controller:'SignUpCtrl'
      //templateUrl: 'Page/tab-dash.html'
    })



  // Each tab has its own nav history stack:

    //-------Calendar Page----//

    .state('tab.calendar', {
      url: '/calendar',
      views: {
        'tab-calendar': {
          templateUrl: 'Page/calendar/tab-calendar.html',
          controller: 'CalendarsCtrl'
        }
      }
    })

    .state('add',{
      url : '/calendar/add',
      templateUrl:'Page/calendar/add.html',
      controller:'AddCtrl'
    })

    .state('tab.todo', {
      url: '/calendar/todo',
      views: {
        'tab-todo':{
          templateUrl: 'Page/calendar/todo.html',
          controller: 'TodoCtrl'
        }
      }
    })
    //-------Calendar Page END----//


    //-------Chat Page----//
    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'Page/chat/menu.html'
      //controller: 'AppCtrl'
    })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'Page/chat/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('app.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'menuContent': {
          templateUrl: 'Page/chat/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

    .state('userInfo', {
      url: '/userInfo/:userId',
      templateUrl: 'Page/Set/userInfo.html',
      controller: 'UserInfoCtrl'
    })


    //-------Chat Page END----//
    .state('class', {
      url: '/class/:Class',
      templateUrl: 'Page/Set/class.html',
      controller: 'ClassCtrl'
    })


    .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'Page/Set/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  //$urlRouterProvider.otherwise('/tab/dash');
  // $urlRouterProvider.otherwise('/app/chat-detail');
  $urlRouterProvider.otherwise('/userInfo/:1');
}]);
