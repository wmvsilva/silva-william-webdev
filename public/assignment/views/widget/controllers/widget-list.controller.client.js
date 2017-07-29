(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);

    function WidgetListController($routeParams, WidgetService, $sce) {
        var model = this;

        model.getEmbeddedUrl = getEmbeddedUrl;
        model.trustUrl = trustUrl;
        model.trustAsHtml = trustAsHtml;
        model.sortWidget = sortWidget;

        function init() {
            model.userId = $routeParams["uid"];
            model.websiteId = $routeParams["wid"];
            model.pageId = $routeParams["pid"];
            WidgetService
                .findWidgetsByPageId(model.pageId)
                .then(function(response) {
                    model.widgets = response.data;
                });
        }

        init();

        function getEmbeddedUrl(youtubeUrl) {
            var urlSplit = youtubeUrl.split('/');
            var id = urlSplit[urlSplit.length - 1];
            return "https://www.youtube.com/embed/" + id;
        }

        function trustUrl(url) {
            return $sce.trustAsResourceUrl(url);
        }

        function trustAsHtml(htmlSnippet) {
            return $sce.trustAsHtml(htmlSnippet);
        }

        function sortWidget(initial, final) {
            WidgetService.sortWidget(model.pageId, initial, final);
        }
    }
})();