(function() {
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController", EditWidgetController);

    function EditWidgetController($routeParams, WidgetService, $location) {
        var model = this;

        model.updateWidget = updateWidget;
        model.deleteWidget = deleteWidget;

        function init() {
            model.userId = $routeParams["uid"];
            model.websiteId = $routeParams["wid"];
            model.pageId = $routeParams["pid"];
            model.widgetId = $routeParams["wgid"];
            model.widget = jQuery.extend(true, {}, WidgetService.findWidgetById(model.widgetId));
        }
        init();

        function updateWidget(widgetId, widget) {
            if (jQuery.inArray(widget.widgetType, ["HEADING", "HTML"]) !== -1) {
                if (!widget.text) {
                    model.error = "Please enter widget text";
                    return;
                }
            } else if (jQuery.inArray(widget.widgetType, ["IMAGE", "YOUTUBE"]) !== -1) {
                console.log(widget);
                if (!widget.url) {
                    model.error = "Please enter a valid widget url";
                    return;
                }
            }
            WidgetService.updateWidget(widgetId, widget);
            $location.url("/user/"+model.userId+"/website/"+model.websiteId+"/page/"+model.pageId+"/widget");
        }

        function deleteWidget(widgetId) {
            WidgetService.deleteWidget(widgetId);
            $location.url("/user/"+model.userId+"/website/"+model.websiteId+"/page/"+model.pageId+"/widget");
        }
    }
})();