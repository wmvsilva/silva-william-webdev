(function () {
    angular
        .module("WebAppMaker")
        .controller("EditPageController", EditPageController);

    function EditPageController($routeParams, PageService, $location) {
        var model = this;

        model.updatePage = updatePage;
        model.deletePage = deletePage;

        function init() {
            model.userId = $routeParams["uid"];
            model.websiteId = $routeParams["wid"];
            model.pageId = $routeParams["pid"];
            PageService
                .findPageById(model.pageId)
                .then(function (response) {
                    model.page = response.data;
                })
        }

        init();

        function updatePage(pageId, page) {
            if (!page || !page.name) {
                model.error = "Please enter a page name";
                return;
            }
            PageService
                .updatePage(pageId, page)
                .then(function () {
                    $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page");
                });
        }

        function deletePage(pageId) {
            PageService
                .deletePage(pageId)
                .then(function () {
                    $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page");
                });
        }
    }
})();