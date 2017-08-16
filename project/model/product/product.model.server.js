var mongoose = require("mongoose");
var productSchema = require("./product.schema.server");

var productModel = mongoose.model("ProjectProductModel", productSchema);

productModel.createProduct = createProduct;
productModel.findProductById = findProductById;
productModel.findProductsByUserId = findProductsByUserId;
productModel.deleteProduct = deleteProduct;
productModel.findProductsByMovieId = findProductsByMovieId;
productModel.userBuyProduct = userBuyProduct;
productModel.findProductsByBuyer = findProductsByBuyer;

productModel.getAllProducts = getAllProducts;
productModel.updateProduct = updateProduct;


module.exports = productModel;

function createProduct(product) {
    return productModel
        .create(product);
}

function findProductById(productId) {
    return productModel
        .findById(productId);
}

function findProductsByUserId(userId) {
    return productModel
        .find({_userId: userId});
}

function findProductsByMovieId(movieId) {
    return productModel
        .find({_movieId: movieId});
}

function deleteProduct(productId) {
    return productModel
        .findById(productId)
        .then(function (product) {
            return product.remove();
        });
}

function userBuyProduct(productId, userId) {
    return productModel
        .findById(productId)
        .then(function (product) {
            product.purchased = true;
            product.buyer = userId;
            return product.save();
        })
}

function findProductsByBuyer(userId) {
    return productModel
        .find({buyer: userId});
}

function getAllProducts() {
    return productModel
        .find()
        .populate("_userId", "_id username")
        .exec();
}

function updateProduct(productId, product) {
    return productModel
        .update({_id: productId}, {$set: product})
        .then((function (product) {
            return productModel.findById(productId);
        }));
}