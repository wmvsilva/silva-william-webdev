(function() {
    angular
        .module("WebAppMaker")
        .controller("NewWidgetController", NewWidgetController);

    function NewWidgetController($routeParams, WidgetService, $location) {
        var model = this;

        model.createWidget = createWidget;

        function init() {
            model.userId = $routeParams["uid"];
            model.websiteId = $routeParams["wid"];
            model.pageId = $routeParams["pid"];
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
})();