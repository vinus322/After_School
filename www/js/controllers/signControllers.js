/**
 * Created by kimmin-young on 2016. 8. 4..
 */
//
 angular.module('starter.signControllers', [])
   .controller('SignInCtrl', function($state,$scope,$http, $ionicPopup,securityServices,$localstorage, $ajax) {
     var AES_key = "abcdefghijklmnopqrstuvwxyz123456";
     var init=function () {
       var dump={};
       dump.login_id = securityServices.service.aesEncrypt("test",AES_key);
       dump.login_pw= securityServices.service.aesEncrypt("test",AES_key);
       $ajax.signIn(dump,function (res) {
         if(!res.result){
           console.log(res.script);
           if(res.script=="already logined")
             $state.go("tab.dash");
         }
       });

       var UserInfo = $localstorage.getObject('UserInfo');
       if(UserInfo===undefined) return;
       if(UserInfo.autoLogin)
        $state.go("tab.dash");
     }


     $scope.autoLogin ={};
     $scope.autoLogin.checked = false;
     init();
     var data = $scope.data = {};

     $scope.signUp = function () {
       console.log("test");
       $state.go("signUp")
     }


     $scope.signin = function () {
       var keys = ["login_id", "login_pw"];
       for (var key in keys) {

         if (typeof data[keys[key]] == "undefined") {
           $ionicPopup.alert({
             title: '로그인',
             template: "아이디 또는 비밀번호를 입력하세요! "
           });
           return;
         }
       }
       var query={};
       securityServices.service.size(256);
       query.login_id = securityServices.service.aesEncrypt(data.login_id,AES_key);
       query.login_pw= securityServices.service.aesEncrypt(data.login_pw,AES_key);
       console.log(query);


       $ajax.signIn(query,function (res) {
             console.log(res);
             if(res.result){
               data.user_id = res.user_id;
               data.user_id = securityServices.service.aesDecrypt(data.user_id,AES_key);
               data.autoLogin = $scope.autoLogin.checked;
               $localstorage.setObject('UserInfo', data);
               $state.go("tab.dash");
             }else{
              console.log(res.script);
               $ionicPopup.alert({
                 title: '알림',
                 template: res.script
               });
             }
       });
       //   });

//       $state.go("tab.dash");

     }

     var setUserInfo = function(data){
       $localstorage.setObject('UserInfo', data);
       var test=  $localstorage.getObject('UserInfo');
       console.log("USERINFO :"+test.userid);
     }

   })
.controller('SignUpCtrl', function($state,$scope,$http, $ionicPopup) {
  var data = $scope.data = {};

  // $scope.update = function() {
  //   var options = {
  //   fileKey: "avatar",
  //   fileName: "image.png",
  //   chunkedMode: false,
  //   mimeType: "image/png"
  //   };
  //   $cordovaFileTransfer.upload("http://192.168.56.1:1337/file/upload", "/android_asset/www/img/ionic.png", options).then(function(result) {
  //     console.log("SUCCESS: " + JSON.stringify(result.response));
  //   }, function(err) {
  //     console.log("ERROR: " + JSON.stringify(err));
  //   }, function (progress) {
  //     // constant progress updates
  //   });
  // };

  $scope.signUp = function () {
    var keys = ["login_id", "login_pw","checkpassword","user_name","phone_number","user_authority"];
    var H = ["아이디", "비밀번호","비밀번호확인","이름","전화번호","권한"];
    for (var key in keys) {

      if (typeof data[keys[key]] == "undefined") {
        $ionicPopup.alert({
          template: H[key] +"를 입력하세요!"
        });
        return;
      }

      if(data.login_pw!=data.checkpassword){
        $ionicPopup.alert({
          template: "비밀번호와 확인이 일치하지 않습니다."
        });
        return;
      }
    }

    console.log(data);
    $state.go("signIn");
  }

});
