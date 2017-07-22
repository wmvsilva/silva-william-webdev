var app = angular.module("WamApp", []);

app.controller("loginController", loginController);

function loginController() {
    alert("hello from loginController");
}