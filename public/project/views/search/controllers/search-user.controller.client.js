(function () {
    angular
        .module("tmdbApp")
        .controller("SearchUserController", SearchUserController);

    function SearchUserController(UserService, $routeParams, user, InitializeService, $location) {
        var model = this;
        InitializeService.initialize(model, SearchUserController, arguments);

        model.searchUserByName = searchUserByName;

        function init() {
            model.usernameParam = $routeParams.username;
            if (model.usernameParam) {
                model.username = model.usernameParam;
                searchUserByName(model.usernameParam);
            }
        }

        init();

        function searchUserByName(username) {
            UserService
                .searchUserByName(username)
                .then(function (response) {
                    model.users = response.data;
                });
            $location.url("/search-user?username=" + username);
        }
    }
})();