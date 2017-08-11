(function () {
    angular
        .module("tmdbApp")
        .factory("ProductService", ProductService);

    function ProductService($http) {

        var api = {
            "createProduct": createProduct,
            findProductsByUserId: findProductsByUserId,
            deleteProduct: deleteProduct
        };
        return api;

        function createProduct(product) {
            var url = "/project-api/product";
            return $http.post(url, product);
        }

        function findProductsByUserId(userId) {
            var url = "/project-api/product/" + userId;
            return $http.get(url);
        }

        function deleteProduct(productId) {
            var url = "/project-api/product/" + productId;
            return $http.delete(url);
        }
    }
})();