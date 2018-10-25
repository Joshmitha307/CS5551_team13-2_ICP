var regangular=angular.module('registerApp',[]);
regangular.controller('registerController',function($scope,$http){
    $scope.submit=function () {
    var req=$http.post('http://localhost:3000/register',$scope.form);
    req.success(function (data,status,header,config) {
        console.log(data);
    });
    req.error(function (data,status,header,error) {
        alert( "failure message: " + JSON.stringify({data: data}));
    })
    }
});