var mongoose = require("mongoose");
var userSchema = require("./user.schema.server");

var userModel = mongoose.model("ProjectUserModel", userSchema);

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;
userModel.followUser = followUser;
userModel.unfollowUser = unfollowUser;

userModel.whoFollows = whoFollows;

userModel.searchUserByName = searchUserByName;

userModel.findUserByGoogleId = findUserByGoogleId;
userModel.getAllUsers = getAllUsers;

userModel.findUserByIdPopulated = findUserByIdPopulated;

module.exports = userModel;

function findUserByGoogleId(googleId) {
    return userModel.findOne({'google.id': googleId});
}

function createUser(user) {
    return userModel
        .create(user);
}

function findUserById(userId) {
    return userModel
        .findById(userId);
}

function findUserByIdPopulated(userId) {
    return userModel
        .findById(userId)
        .populate("likedMovies")
        .populate("following", "username")
        .exec();
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
        .update({_id: userId}, {$set: user})
        .then((function (user) {
            return userModel.findUserById(userId);
        }));
}

function deleteUser(userId) {
    return userModel
        .findUserById(userId)
        .then(function (user) {
            return user.remove();
        });
}

function followUser(userId, otherUserId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            user.following.push(otherUserId);
            return user.save();
        })
}

function unfollowUser(userId, otherUserId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            var index = user.following.indexOf(otherUserId);
            user.following.splice(index, 1);
            return user.save();
        })
}

function whoFollows(userId) {
    return userModel
        .find({following: userId});
}

function searchUserByName(username) {
    return userModel
        .find({"username" : {$regex : ".*" + username + ".*"}});
}

function getAllUsers() {
    return userModel
        .find();
}
