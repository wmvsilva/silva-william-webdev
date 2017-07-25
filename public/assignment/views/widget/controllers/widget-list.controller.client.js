(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);

    function WidgetListController($routeParams, WidgetService, $sce) {
        var model = this;

        model.getEmbeddedUrl = getEmbeddedUrl;
        model.trustUrl = trustUrl;
        model.trustAsHtml = trustAsHtml;

        function init() {
            model.userId = $routeParams["uid"];
            model.websiteId = $routeParams["wid"];
            model.pageId = $routeParams["pid"];
            model.widgets = jQuery.extend(true, {}, WidgetService.findWidgetsByPageId(model.pageId));
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
    }
})();