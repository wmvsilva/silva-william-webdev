module.exports = function (app) {
    require("./services/user.service.server.js")(app);
    require("./services/review.service.server")(app);
    require("./services/product.service.server")(app);
};