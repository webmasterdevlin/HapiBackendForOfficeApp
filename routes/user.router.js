const userController = require("../controllers/user.controller");
const routeConfig = require("../helpers/routeConfig");

const routes = [
  {
    method: "GET",
    path: "/users",
    config: routeConfig,
    handler: async (request, h) =>
      await userController.retrieveUsers(request, h)
  },
  {
    method: "GET",
    path: "/users/{id}",
    config: routeConfig,
    handler: async (request, h) =>
      await userController.retrieveOneUser(request, h, request.params.id)
  },
  {
    method: "POST",
    path: "/register",
    config: routeConfig,
    handler: async (request, h) => await userController.saveUser(request, h)
  },
  {
    method: "PUT",
    path: "/users/{id}",
    config: routeConfig,
    handler: async (request, h) =>
      await userController.updateUser(request, h, request.params.id)
  },
  {
    method: "DELETE",
    path: "/users/{id}",
    config: routeConfig,
    handler: async (request, h) =>
      await userController.removeUser(request, h, request.params.id)
  }
];

module.exports = routes;
