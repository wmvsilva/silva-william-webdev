(function () {
    angular
        .module("tmdbApp")
        .controller("adminController", adminController);

    function adminController($routeParams, $location, movieService, $sce, UserService, ReviewService, ProductService, user, InitializeService) {
        var model = this;
        InitializeService.initialize(model, adminController, arguments);


        function init() {


        }

        init();

    }
})();