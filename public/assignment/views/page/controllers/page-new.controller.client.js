(function () {
    angular
        .module("WebAppMaker")
        .controller("NewPageController", NewPageController);

    function NewPageController($routeParams, PageService, $location) {
        var model = this;

        model.createPage = createPage;

        function init() {
            model.userId = $routeParams["uid"];
            model.websiteId = $routeParams["wid"];
            PageService
                .findPageByWebsiteId(model.websiteId)
                .then(function (response) {
                    model.pages = response.data;
                });
        }

        init();

        function createPage(websiteId, page) {
            if (!page || !page.name) {
                model.error = "Please enter a page name";
                return;
            }
            PageService
                .createPage(websiteId, page)
                .then(function () {
                    $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page");
                });
        }
    }
})();