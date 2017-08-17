var request = require('request');

module.exports = function (app) {

    var productModel = require("../model/product/product.model.server");
    var movieModel = require("../model/movie/movie.model.server");


    app.post("/project-api/product", createProduct);
    app.get("/project-api/product/id/:productId", findProductById);
    app.get("/project-api/product/user/:userId", findProductsByUserId);
    app.get("/project-api/product/movie/:movieId", findProductsByMovieId);
    app.delete("/project-api/product/:productId", deleteProduct);
    app.get("/project-api/product/buy/", userBuyProduct);
    app.get("/project-api/products-bought/:userId", findProductsByBuyer);
    app.get("/project-api/admin/product", getAllProducts);
    app.put("/project-api/product/:productId", updateProduct);
    app.get("/project-api/product-populated/user/:userId", findProductsByUserIdPopulated);

    function createProduct(req, res) {
        var product = req.body;
        productModel
            .createProduct(product)
            .then(function (product) {
                movieModel.addMoviesIfMissing([product._movieId]);
                res.json(product);
            }, function (err) {
                res.status(500).send(err);
            });
    }

    function findProductById(req, res) {
        var productId = req.params.productId;

        return productModel
            .findProductById(productId)
            .then(function (product) {
                res.json(product);
            }, function (err) {
                res.status(500).send(err);
            });
    }

    function findProductsByUserId(req, res) {
        var userId = req.params.userId;

        return productModel
            .findProductsByUserId(userId)
            .then(function (products) {
                res.json(products);
            }, function (err) {
                res.status(500).send(err);
            });
    }

    function findProductsByUserIdPopulated(req, res) {
        var userId = req.params.userId;

        return productModel
            .findProductsByUserIdPopulated(userId)
            .then(function (products) {
                res.json(products);
            }, function (err) {
                res.status(500).send(err);
            });
    }

    function findProductsByMovieId(req, res) {
        var movieId = req.params.movieId;

        return productModel
            .findProductsByMovieId(movieId)
            .then(function (products) {
                res.json(products);
            }, function (err) {
                res.status(500).send(err);
            });
    }

    function deleteProduct(req, res) {
        var productId = req.params.productId;

        productModel
            .deleteProduct(productId)
            .then(function (status) {
                res.sendStatus(200);
            }, function (err) {
                res.status(500).send(err);
                return;
            });
    }

    function userBuyProduct(req, res) {
        var userId = req.query.userId;
        var productId = req.query.productId;

        productModel
            .userBuyProduct(productId, userId)
            .then(function (status) {
                res.json(status);
            }, function (err) {
                res.status(500).send(err);
                return;
            });
    }

    function findProductsByBuyer(req, res) {
        var userId = req.params.userId;

        productModel
            .findProductsByBuyer(userId)
            .then(function (products) {
                res.json(products);
            }, function (err) {
                res.status(500).send(err);
            });
    }

    function getAllProducts(req, res) {
        productModel
            .getAllProducts()
            .then(function (products) {
                res.json(products);
            }, function (err) {
                res.status(500).send(err);
            });
    }

    function updateProduct(req, res) {
        var productId = req.params.productId;
        var product = req.body;

        productModel
            .updateProduct(productId, product)
            .then(function (status) {
                movieModel.addMoviesIfMissing([product._movieId]);
                res.json(status);
            }, function (err) {
                res.sendStatus(404).send(err);
            });
    }
};