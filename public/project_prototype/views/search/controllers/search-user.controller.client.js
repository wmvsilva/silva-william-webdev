(function () {
    angular
        .module("tmdbApp")
        .controller("SearchUserController", SearchUserController);

    function SearchUserController(UserService, $routeParams) {
        var model = this;

        model.searchUserByName = searchUserByName;

        function init() {
            model.userId = $routeParams.userId;
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