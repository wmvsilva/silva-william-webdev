(function () {
    angular
        .module("tmdbApp")
        .controller("adminProductController", adminProductController);

    function adminProductController($routeParams, $location, movieService, $sce, UserService, ReviewService, ProductService, user, InitializeService) {
        var model = this;
        InitializeService.initialize(model, adminProductController, arguments);

        this.selectProduct = selectProduct;

        this.deleteProduct = deleteProduct;
        this.createProduct = createProduct;
        this.updateProduct = updateProduct;

        function init() {
            ProductService
                .getAllProducts()
                .then(function (response) {
                    model.products = response.data;
                });
        }

        init();

        function createProduct(product) {
            ProductService
                .createProduct(product)
                .then(function (response) {
                    ProductService
                        .getAllProducts()
                        .then(function (response) {
                            model.products = response.data;
                        });
                })
        }

        function selectProduct(product) {
            model.selectedProductId = product._id;
            model.selectedProduct = angular.copy(product);
        }

        function deleteProduct(productId) {
            ProductService
                .deleteProduct(productId)
                .then(function (response) {
                    ProductService
                        .getAllProducts()
                        .then(function (response) {
                            model.products = response.data;
                        });
                })
        }

        function updateProduct(productId, product) {
            ProductService
                .updateProduct(productId, product)
                .then(function (response) {
                    ProductService
                        .getAllProducts()
                        .then(function (response) {
                            model.products = response.data;
                        });
                });
            model.selectedProductId = null;
            model.selectedProduct = null;
        }

    }
})();