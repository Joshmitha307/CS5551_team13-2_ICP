var angular1=angular.module('mongo',[]);
angular1.controller('mongoController',function ($scope,$http) {
    $scope.register=function () {
        $http.get('http://localhost:3000/Register',);
    }
    $scope.submit=function () {
        var req=$http.post('http://localhost:3000/register',$scope.form);
        req.success(function (data,status,header,config) {
            console.log(data);
        });
        req.error(function (data,status,header,error) {
            alert( "failure message: " + JSON.stringify({data: data}));
        })
        }
    $scope.list=function(){
        var req=$http.get('http://localhost:3000/list').then(function successCallback(response){
            var result= response.data;
            $scope.listData=result;
            console.log(result);
        },
        function errorCallback(response){
            console.log(response);
        });
    }
    $scope.search=function(){
       var search= {
            "searchTerm":$scope.searchTerm
        }
        var req = $http.post('http://localhost:3000/search',search);
        req.success(function(data, status, headers, config) {
            $scope.message = data;
            console.log(data);
        });
        req.error(function(data, status, headers, config) {
            alert( "failure message: " + JSON.stringify({data: data}));
        });
        document.getElementById("searchResult").style.display = "block";
    }
});