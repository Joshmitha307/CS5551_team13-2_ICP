var app = angular.module("studentApp", []);
app.controller("studentCtrl", function ($scope, $http) {
    //Delclaring the students variable.
    $scope.students = [];
    $scope.isEdit = false;
    $scope.term = "";
    $scope.searchOn = "";
    //init function will call on student.js load. This method will call the get method to fetch the records.
    init = function () {
        $scope.getData();
    }

    //In this method will make a get request to node api to get all records. 
    $scope.getData = function () {
        $http({
            method: 'GET',
            url: 'http://localhost:3001'
        }).then(function successCallback(response) {
            console.log(response.data);
            $scope.students = response.data;
        }, function errorCallback(response) {
            console.log(response);
        });
    }

    //In this method will make a get request to node api to get all records. 
    $scope.search = function () {
        if ($scope.term === "") {
            $scope.getData();
        } else {
            $http({
                method: 'GET',
                url: 'http://localhost:3001/search?search=major&term=' + $scope.term
            }).then(function successCallback(response) {
                console.log(response.data);
                $scope.students = response.data;
            }, function errorCallback(response) {
                console.log(response);
            });
        }
    }

    //In this method will make a post request to node api to add a record. 
    $scope.add = function () {
        let student = {
            "studentName": $scope.data.studentName,
            "minor": $scope.data.minor,
            "course": $scope.data.course,
            "major": $scope.data.major,
            "classId": $scope.data.classId
        }
        $http({
            method: 'POST',
            url: 'http://localhost:3001/create',
            headers: { "Content-Type": "application/json" },
            data: student
        }).then(function successCallback(response) {
            console.log(response.data);
            $scope.getData();
        }, function errorCallback(response) {
            console.log(response);
        });
    }

    //This method will call when user clicks on edit button. In this method we are setting the isEdit to true. 
    $scope.edit = function () {
        $scope.isEdit = true;
    }

    //This method will call when user clicks on cancel button. In this method we are setting the isEdit to false.
    $scope.cancel = function () {
        $scope.isEdit = false;
    }

    //In this method will make a put request to node api to update a record.
    $scope.editsave = function (id) {
        console.log(id);
        var data = $scope.students.filter(function (el) {
            return el._id === id;
        })[0];
        let student = {
            "studentName": data.studentName,
            "minor": data.minor,
            "course": data.course,
            "major": data.major,
            "classId": data.classId
        }
        $http({
            method: 'PUT',
            url: 'http://localhost:3001/update/' + id,
            headers: { "Content-Type": "application/json" },
            data: student
        }).then(function successCallback(response) {
            console.log(response.data);
            $scope.isEdit = false;
            $scope.getData();
        }, function errorCallback(response) {
            console.log(response);
        });
    }

    //In this method will make a delete request to node api to delete a record.
    $scope.delete = function (id) {
        console.log(id);
        $http({
            method: 'DELETE',
            url: 'http://localhost:3001/delete/' + id
        }).then(function successCallback(response) {
            console.log(response.data);
            $scope.getData();
        }, function errorCallback(response) {
            console.log(response);
        });
    }

    //Calling the init method.
    init();
});