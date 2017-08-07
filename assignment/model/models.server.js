module.exports = function() {
    var userModel = require("./user/user.model.server")();

    var model = {
        userModel: userModel
    };

    return model;
};