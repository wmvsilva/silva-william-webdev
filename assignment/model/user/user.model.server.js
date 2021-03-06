var mongoose = require("mongoose");
var userSchema = require("./user.schema.server");

var userModel = mongoose.model("UserModel", userSchema);

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;

module.exports = userModel;

function createUser(user) {
    return userModel
        .create(user);
}

function findUserById(userId) {
    return userModel
        .findById(userId);
}

function findUserByUsername(username) {
    return userModel
        .findOne({username: username});
}

function findUserByCredentials(username, password) {
    return userModel
        .findOne({username: username, password: password});
}

function updateUser(userId, user) {
    return userModel
        .update({_id: userId}, {$set: user});
}

function deleteUser(userId) {
    return userModel
        .findUserById(userId)
        .then(function (user) {
            return user.remove();
        });
}