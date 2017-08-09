var mongoose = require("mongoose");
var websiteSchema = require("./website.schema.server");

var websiteModel = mongoose.model("WebsiteModel", websiteSchema);

websiteModel.createWebsiteForUser = createWebsiteForUser;
websiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.updateWebsite = updateWebsite;
websiteModel.deleteWebsite = deleteWebsite;

module.exports = websiteModel;

function createWebsiteForUser(userId, website) {
    website._user = userId;
    return websiteModel
        .create(website);
}

function findAllWebsitesForUser(userId) {
    return websiteModel
        .find({_user: userId});
}

function findWebsiteById(websiteId) {
    return websiteModel
        .findById(websiteId);
}

function updateWebsite(websiteId, website) {
    return websiteModel
        .update({_id: websiteId}, {$set: website});
}

function deleteWebsite(websiteId) {
    return websiteModel
        .findWebsiteById(websiteId)
        .then(function (website) {
            return website.remove();
        });
}