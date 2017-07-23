(function() {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController);

    function PageListController($routeParams, PageService) {
        var model = this;

        model.userId = $routeParams["uid"];
        model.websiteId = $routeParams["wid"];

        function init() {
            model.pages = jQuery.extend(true, {}, PageService.findPageByWebsiteId(model.websiteId));
        }
        init();
    }

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

    function EditPageController($routeParams, PageService, $location) {
        var model = this;

        model.userId = $routeParams["uid"];
        model.websiteId = $routeParams["wid"];
        model.pageId = $routeParams["pid"];
        model.updatePage = updatePage;
        model.deletePage = deletePage;

        function init() {
            model.page = jQuery.extend(true, {}, PageService.findPageById(model.pageId));
        }
        init();

        function updatePage(pageId, page) {
            if (!page || !page.name) {
                model.error = "Please enter a page name";
                return;
            }
            PageService.updatePage(pageId, jQuery.extend(true, {}, page));
            $location.url("/user/"+model.userId+"/website/"+model.websiteId+"/page");
        }

        function deletePage(pageId) {
            PageService.deletePage(pageId);
            $location.url("/user/"+model.userId+"/website/"+model.websiteId+"/page");
        }
    }
})();