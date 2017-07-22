(function() {

    angular
        .module("WamApp")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/login", {
                templateUrl: "user/templates/login.html"
            })
            .when("/register", {
                templateUrl: "user/templates/register.html"
            })
            .when("/profile/:userId", {
                templateUrl: "user/templates/profile.html"
            });
    }
})();