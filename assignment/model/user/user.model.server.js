var mongoose = require("mongoose");
var userSchema = require("./user.schema.server");

var userModel = mongoose.model("UserModel", userSchema);

var api = {
    createUser: createUser,
    findUserById: findUserById,
    findUserByUsername: findUserByUsername,
    findUserByCredentials: findUserByCredentials,
    updateUser: updateUser,
    deleteUser: deleteUser,
    addWebsite: addWebsite
};
module.exports = api;

function createUser(user) {
    return userModel.create(user);
}

function findUserById(userId) {
    return userModel.findById(userId);
}

function findUserByUsername(username) {
    return userModel.findOne({username: username});
}

function findUserByCredentials(username, password) {
    return userModel.findOne({username: username, password: password});
}

function updateUser(userId, user) {
    return userModel.update({_id: userId}, {$set: user});
}

function deleteUser(userId) {
    return userModel.remove({_id: userId});
}

function addWebsite(userId, websiteId) {
    return findUserById(userId)
        .then(function (user) {
            user.websites.push(websiteId);
            return user.save();
        });
}