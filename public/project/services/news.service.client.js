(function () {
    angular
        .module("tmdbApp")
        .service("newsService", newsService);

    function newsService($http) {

        this.getEntertainmentWeeklyArticles = getEntertainmentWeeklyArticles;

        function getEntertainmentWeeklyArticles() {
            var url = "https://newsapi.org/v1/articles?source=entertainment-weekly&sortBy=top&apiKey=ade7760c638749aeb3b47acb19713030";
            return $http
                .get(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();