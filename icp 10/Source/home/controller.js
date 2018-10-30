var searchapp = angular.module("searchEngine",[]);
searchapp.controller("searchEngineController",function($scope,$http){
    $scope.search=function(){
        $http({
            method: 'GET',
            url:'https://dry-fortress-84708.herokuapp.com/getDetails?searchTerm='+$scope.searchTerm
            
        }).then(function successCallBack(response){
            console.log(response);
            $scope.results=response.data.items;
            },function errorCallBack(response){
                console.log(response);
            })
        }
    }
);