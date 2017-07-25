(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, WebsiteService) {
        var model = this;

        function init() {
            model.userId = $routeParams["uid"];
            model.websites = jQuery.extend(true, {}, WebsiteService.findWebsitesByUser(model.userId));
        }
        init();
    }
})();