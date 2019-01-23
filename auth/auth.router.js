const authController = require("./auth.controller");
const routeConfig = require("../helpers/routeConfig");

const routes = [
  {
    method: "POST",
    path: "/auth/login",
    config: routeConfig,
    handler: async (request, h) => await authController.authUser(request, h)
  }
];

module.exports = routes;
