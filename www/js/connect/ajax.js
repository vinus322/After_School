/**
 * Created by kimmin-young on 2016. 8. 5..
 */

angular.module('ajax',[])
  .service('$ajax',function ($http,$ionicPopup) {
      var base_url = "http://210.118.64.213:3000";

      this.signIn = function (query, callback) {
        $http({
          url: base_url+"/users/login",
          method: "POST",
          headers: {
            'Content-Type': "application/json"
          },
          data: query
        })
          .success(function (res) {
            callback(res);
          })
          .error(function (data, status, headers, config) {
            console.log(status);
            $ionicPopup.alert({
              title: '알림',
              template: "인터넷 연결을 확인해주세요"
            });
          });
      }
      this.logout = function (callback) {
        $http({
          url:base_url+ "/logout",
          method: "get",
          headers: {
            'Content-Type': "application/json"
          }
        })
          .success(function (res) {
            callback(res);
          })
          .error(function (data, status, headers, config) {
            console.log(status);
            return;
          });
      }

  });


