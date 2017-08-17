(function () {

    angular
        .module("tmdbApp")
        .config(Config);

    function Config($routeProvider, $httpProvider) {

        $httpProvider.defaults.headers.post['Accept'] = 'application/json, text/javascript';

        $routeProvider
            .when("/", {
                templateUrl: "views/home/templates/home.view.client.html",
                controller: "homeController",
                controllerAs: "model",
                resolve: {
                    user: getLoggedInUser
                }
            })
            .when("/search", {
                templateUrl: "views/search/templates/search.view.client.html",
                controller: "searchController",
                controllerAs: "model",
                resolve: {
                    user: getLoggedInUser
                }
            })
            .when("/details/:id", {
                templateUrl: "views/details/templates/details.view.client.html",
                controller: "detailsController",
                controllerAs: "model",
                resolve: {
                    user: getLoggedInUser
                }
            })
            .when("/login", {
                templateUrl: "views/user/templates/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model",
                resolve: {
                    user: getLoggedInUser
                }
            })
            .when("/register", {
                templateUrl: "views/user/templates/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model",
                resolve: {
                    user: getLoggedInUser
                }
            })
            .when("/user", {
                templateUrl: "views/user/templates/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    user: checkLogin
                }
            })
            .when("/search-user", {
                templateUrl: "views/search/templates/search-user.view.client.html",
                controller: "SearchUserController",
                controllerAs: "model",
                resolve: {
                    user: getLoggedInUser
                }
            })
            .when("/sell", {
                templateUrl: "views/sell/templates/sell.view.client.html",
                controller: "sellController",
                controllerAs: "model",
                resolve: {
                    user: checkLogin
                }
            })
            .when("/sell/search", {
                templateUrl: "views/sell/templates/sell-search.view.client.html",
                controller: "sellController",
                controllerAs: "model",
                resolve: {
                    user: getLoggedInUser
                }
            })
            .when("/sell/movie/:movieId", {
                templateUrl: "views/sell/templates/sell-select.view.client.html",
                controller: "sellController",
                controllerAs: "model",
                resolve: {
                    user: getLoggedInUser
                }
            })
            .when("/product/:productId", {
                templateUrl: "views/sell/templates/product-detail.view.client.html",
                controller: "productDetailController",
                controllerAs: "model",
                resolve: {
                    user: getLoggedInUser
                }
            })
            .when("/profile/:uid", {
                templateUrl: "views/user/templates/other-profile.view.client.html",
                controller: "OtherProfileController",
                controllerAs: "model",
                resolve: {
                    user: getLoggedInUser
                }
            })
            .when("/admin", {
                templateUrl: "views/admin/templates/admin.view.client.html",
                controller: "adminController",
                controllerAs: "model",
                resolve: {
                    user: checkAdmin
                }
            })
            .when("/admin/users", {
                templateUrl: "views/admin/templates/admin-user.view.client.html",
                controller: "adminUserController",
                controllerAs: "model",
                resolve: {
                    user: checkAdmin
                }
            })
            .when("/admin/reviews", {
                templateUrl: "views/admin/templates/admin-review.view.client.html",
                controller: "adminReviewController",
                controllerAs: "model",
                resolve: {
                    user: checkAdmin
                }
            })
            .when("/admin/products", {
                templateUrl: "views/admin/templates/admin-product.view.client.html",
                controller: "adminProductController",
                controllerAs: "model",
                resolve: {
                    user: checkAdmin
                }
            });
    }

    function checkLogin(UserService, $q, $location) {
        var deferred = $q.defer();
        UserService
            .checkLogin()
            .then(function (user) {
                if (user === '0') {
                    deferred.reject();
                    $location.url("/login?ref=auth");
                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

    function checkAdmin(UserService, $q, $location) {
        var deferred = $q.defer();
        UserService
            .checkLogin()
            .then(function (user) {
                if (user === '0' || user.role !== "admin") {
                    deferred.reject();
                    $location.url("/login");
                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

    function getLoggedInUser(UserService, $q) {
        var deferred = $q.defer();
        UserService
            .checkLogin()
            .then(function (user) {
                if (user === '0') {
                    deferred.resolve(undefined);
                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }
})();