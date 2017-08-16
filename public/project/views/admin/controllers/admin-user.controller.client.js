(function () {
    angular
        .module("tmdbApp")
        .controller("adminUserController", adminUserController);

    function adminUserController($routeParams, $location, movieService, $sce, UserService, ReviewService, ProductService, user, InitializeService) {
        var model = this;
        InitializeService.initialize(model, adminUserController, arguments);

        this.createUser = createUser;
        this.selectUser = selectUser;
        this.deleteUser = deleteUser;
        this.updateUser = updateUser;

        function init() {
            UserService
                .getAllUsers()
                .then(function (response) {
                    model.users = response.data;
                });
        }

        init();

        function createUser(user) {
            UserService
                .createUser(user)
                .then(function (response) {
                    UserService
                        .getAllUsers()
                        .then(function (response) {
                            model.users = response.data;
                        });
                })
        }

        function selectUser(user) {
            model.selectedUserId = user._id;
            model.selectedUser = angular.copy(user);
        }

        function deleteUser(userId) {
            UserService
                .deleteUser(userId)
                .then(function (response) {
                    UserService
                        .getAllUsers()
                        .then(function (response) {
                            model.users = response.data;
                        });
                })
        }

        function updateUser(userId, user) {
            UserService
                .updateUser(userId, user)
                .then(function (response) {
                    UserService
                        .getAllUsers()
                        .then(function (response) {
                            model.users = response.data;
                        });
                });
            model.selectedUserId = null;
            model.selectedUser = null;
        }

    }
})();