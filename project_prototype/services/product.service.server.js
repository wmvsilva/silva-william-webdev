module.exports = function (app) {

    var productModel = require("../model/product/product.model.server");

    app.post("/project-prototype-api/product", createProduct);
    app.get("/project-prototype-api/product/id/:productId", findProductById);
    app.get("/project-prototype-api/product/user/:userId", findProductsByUserId);
    app.get("/project-prototype-api/product/movie/:movieId", findProductsByMovieId);
    app.delete("/project-prototype-api/product/:productId", deleteProduct);
    app.get("/project-prototype-api/product/buy/", userBuyProduct);
    app.get("/project-prototype-api/products-bought/:userId", findProductsByBuyer);

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
};