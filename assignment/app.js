module.exports = function (app) {
    var db = require("./model/database");
    var model = require("./model/models.server")();
    require("./services/user.service.server.js")(app, model.userModel);
    require("./services/website.service.server.js")(app, model.websiteModel);
    require("./services/page.service.server")(app, model.pageModel);
    require("./services/widget.service.server")(app);
};