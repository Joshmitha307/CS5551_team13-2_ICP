var app = angular.module("faceApp", []);
app.controller("faceCtrl", function ($scope, $http) {
    //Delclaring the books variable.
    $scope.url = "";
    $scope.imgurl = "default.png";
    $scope.name = "";

    //In this method will make a get request to node api to get all records. 
    $scope.getName = function () {
        $scope.name="";
        $http({
            method: 'GET',
            url: 'http://localhost:3002/getName?url=' + $scope.url
        }).then(function successCallback(response) {
            console.log(response.data);
            $scope.imgurl = $scope.url;
            response.data.split(" ").forEach(element => {
                $scope.name = $scope.name + element.charAt(0).toUpperCase() + element.slice(1)+" ";
            });
        }, function errorCallback(response) {
            console.log(response);
        });
    }
});