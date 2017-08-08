var mongoose = require("mongoose");
var userModel = require("../user/user.model.server");
var websiteSchema = require("./website.schema.server");

var websiteModel = mongoose.model("WebsiteSchema", websiteSchema);

var api = {
    createWebsiteForUser: createWebsiteForUser,
    findAllWebsitesForUser: findAllWebsitesForUser,
    findWebsiteById: findWebsiteById,
    updateWebsite: updateWebsite,
    deleteWebsite: deleteWebsite
};
module.exports = api;

function createWebsiteForUser(userId, website) {
    website._user = userId;
    var websiteTmp = null;
    return websiteModel
        .create(website)
        .then(function (websiteDoc) {
            websiteTmp = websiteDoc;
            return userModel.addWebsite(userId, websiteDoc._id);
        })
        .then(function (userDoc) {
            return websiteTmp;
        });
}

function findAllWebsitesForUser(userId) {
    return websiteModel.find({_user: userId});
}

function findWebsiteById(websiteId) {
    return websiteModel.findById(websiteId);
}

function updateWebsite(websiteId, website) {
    return websiteModel.update({_id: websiteId}, {$set: website});
}

function deleteWebsite(userId, websiteId) {
    return websiteModel
        .remove({_id: websiteId})
        .then(function (status) {
           return userModel.removeWebsite(userId, websiteId);
        });
}