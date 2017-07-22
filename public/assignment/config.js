(function() {

    angular
        .module("WamApp")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/login", {
                templateUrl: "login.html"
            })
            .when("/register", {
                templateUrl: "register.html"
            })
            .when("/profile/:userId", {
                templateUrl: "profile.html"
            });
    }
})();