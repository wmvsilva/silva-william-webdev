(function() {
    angular
        .module("WebAppMaker")
        .controller("NewPageController", NewPageController);

    function NewPageController($routeParams, PageService, $location) {
        var model = this;

        model.userId = $routeParams["uid"];
        model.websiteId = $routeParams["wid"];
        model.createPage = createPage;

        function init() {
        }
        init();

        function createPage(websiteId, page) {
            if (!page || !page.name) {
                model.error = "Please enter a page name";
                return;
            }
            PageService.createPage(websiteId, page);
            $location.url("/user/"+model.userId+"/website/"+model.websiteId+"/page");
        }
    }
})();