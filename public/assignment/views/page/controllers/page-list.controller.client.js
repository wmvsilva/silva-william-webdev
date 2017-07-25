(function() {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController($routeParams, PageService) {
        var model = this;

        model.userId = $routeParams["uid"];
        model.websiteId = $routeParams["wid"];

        function init() {
            model.pages = jQuery.extend(true, {}, PageService.findPageByWebsiteId(model.websiteId));
        }
        init();
    }
})();