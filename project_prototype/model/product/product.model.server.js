var mongoose = require("mongoose");
var productSchema = require("./product.schema.server");

var productModel = mongoose.model("ProjectProductModel", productSchema);

productModel.createProduct = createProduct;
productModel.findProductsByUserId = findProductsByUserId;
productModel.deleteProduct = deleteProduct;


module.exports = productModel;

function createProduct(product) {
    return productModel
        .create(product);
}

function findProductsByUserId(userId) {
    return productModel
        .find({_userId: userId});
}

function deleteProduct(productId) {
    return productModel
        .findById(productId)
        .then(function (product) {
            return product.remove();
        });
}