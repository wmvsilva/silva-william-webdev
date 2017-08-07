module.exports = function() {
    var userModel = require("./user/user.model.server")();
    var websiteModel = require("./website/website.model.server")();
    var pageModel = require("./page/page.model.server")();

    var model = {
        userModel: userModel,
        websiteModel: websiteModel,
        pageModel: pageModel
    };

    return model;
};