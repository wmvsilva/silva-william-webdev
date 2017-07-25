(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController($routeParams, PageService) {
        var model = this;

        function init() {
            model.userId = $routeParams["uid"];
            model.websiteId = $routeParams["wid"];
            model.pages = jQuery.extend(true, {}, PageService.findPageByWebsiteId(model.websiteId));
        }

        init();
    }
})();