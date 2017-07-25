(function() {
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController", EditWidgetController);

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