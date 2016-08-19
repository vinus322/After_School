/**
 * Created by kimmin-young on 2016. 8. 8..
 */
angular.module('starter.testController',[])
.controller('TESTCTRL', function ($scope, $state,securityServices,$crypto ) {

  $scope.onload = function() {
    $scope.ko_encrypt = $crypto.encrypt('asdfsdf', 'abcdefghijklmnopqrstuvwxyz123456');
    $scope.ko_decrypt  = $crypto.decrypt($scope.ko_encrypt, 'abcdefghijklmnopqrstuvwxyz123456');
  }

  // var key = "abcdefghijklmnopqrstuvwxyz123456";
  // //var key = "password";
  // $scope.onload = function(){
  //
  //   //var res = Test.add(3,2);
  //   //$scope.ko_encrypt = res;
  //
  //    $scope.ko_encrypt = AES_Encode("한글을 테스트 합니다.");
  //    $scope.ko_decrypt = AES_Decode("gOXlygE+qxS+69zN5qC6eKJvMiEoDQtdoJb3zjT8f/E=");
  //    $scope.us_encrypt = AES_Encode("Test English...");
  //    $scope.us_decrypt = AES_Decode("rvs4H8x4Q8sblGG1jkOHFQ==");
  // }
  // var AES_Encode = function(plain_text)
  // {
  //   securityServices.service.size(256);
  //   return securityServices.service.aesEncrypt(plain_text, key);
  // }
  //
  // var AES_Decode=function (base64_text)
  // {
  //   securityServices.service.size(256);
  //   return securityServices.service.aesDecrypt(base64_text, key);
  // }


});
