var app = angular.module("WamApp", []);

app.controller("loginController", loginController);

function loginController($scope) {
    $scope.hello = "hello from loginController";
}