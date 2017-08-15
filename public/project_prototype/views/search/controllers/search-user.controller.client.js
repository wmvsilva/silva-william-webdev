(function () {
    angular
        .module("tmdbApp")
        .controller("SearchUserController", SearchUserController);

    function SearchUserController(UserService, $routeParams, user) {
        var model = this;

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