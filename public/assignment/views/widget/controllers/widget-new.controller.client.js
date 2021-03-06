(function () {
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
            widget.type = widgetType;
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
                case "HTML":
                    widget.text = "<p>Test HTML</p>";
                    break;
            }
            WidgetService
                .createWidget(pageId, widget)
                .then(function (response) {
                    var newWidget = response.data;
                    $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId +
                        "/widget/" + newWidget._id);
                });
        }
    }
})();