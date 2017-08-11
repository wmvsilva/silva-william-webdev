(function () {

    angular
        .module("tmdbApp")
        .config(Config);

    function Config($routeProvider, $httpProvider) {

        $httpProvider.defaults.headers.post['Accept'] = 'application/json, text/javascript';

        $routeProvider
            .when("/", {
                templateUrl: "views/search/templates/search.html",
                controller: "searchController",
                controllerAs: "model"
            })
            .when("/search", {
                templateUrl: "views/search/templates/search.html",
                controller: "searchController",
                controllerAs: "model"
            })
            .when("/details/:id", {
                templateUrl: "views/details/templates/details.html",
                controller: "detailsController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "views/user/templates/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/templates/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/user/:uid", {
                templateUrl: "views/user/templates/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model"
            })
            .when("/search-user", {
                templateUrl: "views/search/templates/search-user.view.client.html",
                controller: "SearchUserController",
                controllerAs: "model"
            })
            .when("/sell", {
                templateUrl: "views/sell/templates/sell.view.client.html",
                controller: "sellController",
                controllerAs: "model"
            })
            .when("/sell/search", {
                templateUrl: "views/sell/templates/sell-search.view.client.html",
                controller: "sellController",
                controllerAs: "model"
            })
            .when("/sell/movie/:movieId", {
                templateUrl: "views/sell/templates/sell-select.view.client.html",
                controller: "sellController",
                controllerAs: "model"
            })
            .when("/product/:productId", {
                templateUrl: "views/sell/templates/product-detail.view.client.html",
                controller: "productDetailController",
                controllerAs: "model"
            })
            .when("/profile/:uid", {
                templateUrl: "views/user/templates/other-profile.view.client.html",
                controller: "OtherProfileController",
                controllerAs: "model"
            })
    }
})();