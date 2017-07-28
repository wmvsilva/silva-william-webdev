(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);

    function NewWebsiteController($routeParams, WebsiteService, $location) {
        var model = this;

        model.createWebsite = createWebsite;

        function init() {
            model.userId = $routeParams["uid"];
            WebsiteService.findWebsitesByUser(model.userId)
                .then(function (websites) {
                    model.websites = websites;
                });
        }

        init();

        function createWebsite(userId, website) {
            if (!website || !website.name) {
                model.error = "Please enter in a website name";
                return;
            }
            WebsiteService.createWebsite(userId, website)
                .then(function() {
                    $location.url("/user/" + model.userId + "/website");
                });
        }
    }
})();