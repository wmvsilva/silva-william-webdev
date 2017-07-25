(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController);

    function WidgetListController($routeParams, WidgetService, $sce) {
        var model = this;

        model.userId = $routeParams["uid"];
        model.websiteId = $routeParams["wid"];
        model.pageId = $routeParams["pid"];

        model.getEmbeddedUrl = getEmbeddedUrl;
        model.trustUrl = trustUrl;
        model.trustAsHtml = trustAsHtml;

        function init() {
            model.widgets = jQuery.extend(true, {}, WidgetService.findWidgetsByPageId(model.pageId));
        }
        init();

        function getEmbeddedUrl(youtubeUrl) {
            var urlSplit = youtubeUrl.split('/');
            var id = urlSplit[urlSplit.length - 1];
            return "https://www.youtube.com/embed/"+ id;
        }

        function trustUrl(url) {
            return $sce.trustAsResourceUrl(url);
        }

        function trustAsHtml(htmlSnippet) {
            return $sce.trustAsHtml(htmlSnippet);
        }
    }

    function NewWidgetController($routeParams, WidgetService, $location) {
        var model = this;

        model.userId = $routeParams["uid"];
        model.websiteId = $routeParams["wid"];
        model.pageId = $routeParams["pid"];

        model.createWidget = createWidget;

        function init() {
        }
        init();

        function createWidget(pageId, widgetType) {
            var widget = {};
            widget.widgetType = widgetType;
            switch (widgetType) {
                case "HEADING":
                    widget.size = 1;
                    widget.text = "SAMPLE";
                    break;
                case "IMAGE":
                    widget.width = "50%";
                    widget.url = "http://lorempixel.com/400/200/";
                    break;
                case "YOUTUBE":
                    widget.width = "100%";
                    widget.url = "https://youtu.be/-MH6JZdGZcI";
                    break;
            }
            var newWidget = WidgetService.createWidget(pageId, widget);
            $location.url("/user/"+ model.userId+"/website/"+model.websiteId+"/page/"+model.pageId+"/widget/"+newWidget._id);
        }
    }

    function EditWidgetController($routeParams, WidgetService, $location) {
        var model = this;

        model.userId = $routeParams["uid"];
        model.websiteId = $routeParams["wid"];
        model.pageId = $routeParams["pid"];
        model.widgetId = $routeParams["wgid"];

        model.updateWidget = updateWidget;
        model.deleteWidget = deleteWidget;

        function init() {
            model.widget = jQuery.extend(true, {}, WidgetService.findWidgetById(model.widgetId));
        }
        init();

        function updateWidget(widgetId, widget) {
            WidgetService.updateWidget(widgetId, widget);
            $location.url("/user/"+model.userId+"/website/"+model.websiteId+"/page/"+model.pageId+"/widget");
        }

        function deleteWidget(widgetId) {
            WidgetService.deleteWidget(widgetId);
            $location.url("/user/"+model.userId+"/website/"+model.websiteId+"/page/"+model.pageId+"/widget");
        }
    }
})();