(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, WebsiteService) {
        var model = this;

        model.userId = $routeParams["uid"];

        function init() {
            model.websites = jQuery.extend(true, {}, WebsiteService.findWebsitesByUser(model.userId));
        }
        init();
    }
})();