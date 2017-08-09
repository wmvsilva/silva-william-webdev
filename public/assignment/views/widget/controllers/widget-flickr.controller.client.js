(function () {
    angular
        .module("WebAppMaker")
        .controller("flickrController", flickrController);

    function flickrController(flickrService, $routeParams, WidgetService, $location) {
        var model = this;

        model.searchPhotos = searchPhotos;
        model.selectPhoto = selectPhoto;

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

        function selectPhoto(photo) {
            var url = "https://farm"+photo.farm+".staticflickr.com/"+photo.server+"/"+photo.id+"_"+photo.secret+"_m.jpg";
            model.widget.url = url;
            WidgetService
                .updateWidget(model.widgetId, model.widget)
                .then(function () {
                    $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget/"+model.widget._id);
                });
        }

        function searchPhotos(searchTerm) {
            console.log(searchTerm);
            flickrService.searchPhotos(searchTerm)
                .then(function(response) {
                    console.log(response.data);
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    model.photos = data.photos;
                });

        }
    }
})();