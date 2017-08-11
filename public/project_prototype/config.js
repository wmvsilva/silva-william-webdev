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
            .when("/details/:id", {
                templateUrl: "views/details/templates/details.html",
                controller: "detailsController",
                controllerAs: "model"
            });
    }
})();