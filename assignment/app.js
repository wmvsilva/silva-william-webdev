module.exports = function (app) {
    require("./model/models.server");
    require("./services/user.service.server.js")(app);
    require("./services/website.service.server.js")(app);
    require("./services/page.service.server")(app);
    require("./services/widget.service.server")(app);
};