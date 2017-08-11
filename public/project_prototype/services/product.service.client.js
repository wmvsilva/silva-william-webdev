(function () {
    angular
        .module("tmdbApp")
        .factory("ProductService", ProductService);

    function ProductService($http) {

        var api = {
            "createProduct": createProduct,
            findProductById: findProductById,
            findProductsByUserId: findProductsByUserId,
            findProductsByMovieId: findProductsByMovieId,
            deleteProduct: deleteProduct,
            userBuyProduct: userBuyProduct
        };
        return api;

        function createProduct(product) {
            var url = "/project-api/product";
            return $http.post(url, product);
        }

        function findProductById(productId) {
            var url = "/project-api/product/id/" + productId;
            return $http.get(url);
        }

        function findProductsByUserId(userId) {
            var url = "/project-api/product/user/" + userId;
            return $http.get(url);
        }

        function findProductsByMovieId(movieId) {
            var url = "/project-api/product/movie/" + movieId;
            return $http.get(url);
        }

        function deleteProduct(productId) {
            var url = "/project-api/product/" + productId;
            return $http.delete(url);
        }

        function userBuyProduct(userId, productId) {
            var url = "/project-api/product/buy?productId=" + productId + "&userId=" + userId;
            return $http.get(url);
        }
    }
})();