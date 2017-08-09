(function () {
    angular
        .module("WebAppMaker")
        .service("flickrService", flickrService);

    function flickrService($http) {
        var key = "dc24a36ab655e25acbdf1d07f0faba85";
        var secret = "2f29f9649a08256c";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

        this.searchPhotos = searchPhotos;

        function searchPhotos(searchTerm) {
            var url = urlBase
                .replace("API_KEY", key)
                .replace("TEXT", searchTerm);
            return $http.get(url);
        }

    }
})();