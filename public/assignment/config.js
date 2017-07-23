(function() {

    angular
        .module("WebAppMaker")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/login", {
                templateUrl: "views/user/login.view.client.html",
                controller: "loginController",
                controllerAs: "model"
            })
            .when("/", {
                templateUrl: "views/user/login.view.client.html",
                controller: "loginController",
                controllerAs: "model"
            })
            .when("", {
                templateUrl: "views/user/login.view.client.html",
                controller: "loginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/register.view.client.html",
                controller: "registerController",
                controllerAs: "model"
            })
            .when("/user/:uid", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "profileController",
                controllerAs: "model"
            })
        // website routes
            .when("/user/:uid/website", {
                templateUrl: "views/website/website-list.view.client.html",
                controller: "websiteListController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/new", {
                templateUrl: "views/website/website-new.view.client.html"
            })
            .when("/user/:uid/website/:wid", {
                templateUrl: "views/website/website-edit.view.client.html"
            })
            // page routes
            .when("/user/:uid/website/:wid/page", {
                templateUrl: "views/page/page-list.view.client.html"
            })
            .when("/user/:uid/website/:wid/page/new", {
                templateUrl: "views/page/page-new.view.client.html"
            })
            .when("/user/:uid/website/:wid/page/:pid", {
                templateUrl: "views/page/page-edit.view.client.html"
            })
            // widget routes
            .when("/user/:uid/website/:wid/page/widget", {
                templateUrl: "views/widget/widget-list.view.client.html"
            })
            .when("/user/:uid/website/:wid/page/widget/new", {
                templateUrl: "views/widget/widget-chooser.view.client.html"
            })
            .when("/user/:uid/website/:wid/page/widget/:wgid", {
                templateUrl: "views/widget/widget-edit.view.client.html"
            });
    }
})();