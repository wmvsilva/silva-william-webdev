(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController", EditWidgetController);

    function EditWidgetController($routeParams, WidgetService, $location) {
        var model = this;

        model.updateWidget = updateWidget;
        model.deleteWidget = deleteWidget;
        model.uploadImage = uploadImage;

        function init() {
            model.userId = $routeParams["uid"];
            model.websiteId = $routeParams["wid"];
            model.pageId = $routeParams["pid"];
            model.widgetId = $routeParams["wgid"];
            WidgetService
                .findWidgetById(model.widgetId)
                .then(function (response) {
                    model.widget = response.data;
                });
        }

        init();

        function updateWidget(widgetId, widget) {
            if (jQuery.inArray(widget.widgetType, ["HEADING", "HTML"]) !== -1) {
                if (!widget.text) {
                    model.error = "Please enter widget text";
                    return;
                }
            } else if (jQuery.inArray(widget.widgetType, ["IMAGE", "YOUTUBE"]) !== -1) {
                if (!widget.url) {
                    model.error = "Please enter a valid widget url";
                    return;
                }
            }
            WidgetService
                .updateWidget(widgetId, widget)
                .then(function () {
                    $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget");
                });
        }

        function deleteWidget(widgetId) {
            WidgetService
                .deleteWidget(widgetId)
                .then(function () {
                    $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget");
                });
        }

        function uploadImage() {
            if (document.getElementById("wvs-widget-image-file").value !== "") {
                jQuery("#wvs-upload-image-button").click();
            } else {
                model.error = "Please upload an image file before pressing Upload Image";
            }
        }
    }
})();