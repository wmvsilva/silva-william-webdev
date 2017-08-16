(function () {
    angular
        .module("tmdbApp")
        .controller("SearchUserController", SearchUserController);

    function SearchUserController(UserService, $routeParams, user, InitializeService) {
        var model = this;
        InitializeService.initialize(model, SearchUserController, arguments);

        model.searchUserByName = searchUserByName;

        function init() {
            if (user) {
                model.userId = user._id;
            }
        }

        init();

        function searchUserByName(username) {
            UserService
                .searchUserByName(username)
                .then(function (response) {
                    model.users = response.data;
                });
        }
    }
})();