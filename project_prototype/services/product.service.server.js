module.exports = function (app) {

    var productModel = require("../model/product/product.model.server");

    app.post("/project-api/product", createProduct);
    app.get("/project-api/product/:userId", findProductsByUserId);
    app.get("/project-api/product/movie/:movieId", findProductsByMovieId);
    app.delete("/project-api/product/:productId", deleteProduct);

    function createProduct(req, res) {
        var product = req.body;
        productModel
            .createProduct(product)
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
};