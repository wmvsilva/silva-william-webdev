module.exports = function (app) {
    require("./services/user.service.server.js")(app);
    require("./services/review.service.server")(app);
};