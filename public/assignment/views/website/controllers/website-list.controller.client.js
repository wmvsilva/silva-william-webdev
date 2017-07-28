(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, WebsiteService) {
        var model = this;

        function init() {
            model.userId = $routeParams["uid"];
            WebsiteService
                .findWebsitesByUser(model.userId)
                .then(function (response) {
                    model.websites = response.data;
                });
        }

        init();
    }
})();