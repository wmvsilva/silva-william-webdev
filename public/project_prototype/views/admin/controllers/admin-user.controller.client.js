(function () {
    angular
        .module("tmdbApp")
        .controller("adminUserController", adminUserController);

    function adminUserController($routeParams, $location, movieService, $sce, UserService, ReviewService, ProductService, user, InitializeService) {
        var model = this;
        InitializeService.initialize(model, adminUserController, arguments);

        this.createUser = createUser;
        this.selectUser = selectUser;

        function init() {
            UserService
                .getAllUsers()
                .then(function (response) {
                    model.users = response.data;
                });
        }

        init();

        function createUser(user) {
            console.log(user);
        }

        function selectUser(user) {
            model.selectedUserId = user._id;
            model.selectedUser = user;
        }

    }
})();