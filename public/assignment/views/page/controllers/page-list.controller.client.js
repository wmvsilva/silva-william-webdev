(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController($routeParams, PageService) {
        var model = this;

        function init() {
            model.userId = $routeParams["uid"];
            model.websiteId = $routeParams["wid"];
            PageService
                .findPageByWebsiteId(model.websiteId)
                .then(function(response) {
                    model.pages = response.data;
                })
        }

        init();
    }
})();