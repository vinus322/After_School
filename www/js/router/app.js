// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in calenderControllers.js
angular.module('starter', ['ionic','ngStorage',
  'starter.signControllers',
  'starter.chatControllers',
  'starter.calenderControllers',
  'starter.setControllers',
  'starter.securityServices',
  'starter.services',
  'starter.testController',
  'ajax',
  'ngStorage'])

.run(function($ionicPlatform) {
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
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in calenderControllers.js
  $stateProvider

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

    // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'Page/tabs.html'
  })


  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'Page/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'Page/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('chat-detail', {
      url: '/chats/:chatId',
    //  views: {
       // 'tab-chats': {
          templateUrl: 'Page/chat-detail.html',
          controller: 'ChatDetailCtrl'
       // }
     // }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'Page/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  //$urlRouterProvider.otherwise('/tab/dash');
  $urlRouterProvider.otherwise('/signIn');
});
