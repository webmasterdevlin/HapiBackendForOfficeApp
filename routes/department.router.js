const departmentController = require("../controllers/department.controller");
const routeConfig = require("../helpers/routeConfig");

const routes = [
  {
    method: "GET",
    path: "/departments",
    config: routeConfig,
    handler: async (request, h) =>
      await departmentController.retrieveDepartments(request, h)
  },
  {
    method: "GET",
    path: "/departments/{id}",
    config: routeConfig,
    handler: async (request, h) =>
      await departmentController.retrieveOneDepartment(
        request,
        h,
        request.params.id
      )
  },
  {
    method: "POST",
    path: "/departments",
    config: routeConfig,
    handler: async (request, h) =>
      await departmentController.saveDepartment(request, h)
  },
  {
    method: "PUT",
    path: "/departments/{id}",
    config: routeConfig,
    handler: async (request, h) =>
      await departmentController.updateDepartment(request, h, request.params.id)
  },
  {
    method: "DELETE",
    path: "/departments/{id}",
    config: routeConfig,
    handler: async (request, h) =>
      await departmentController.removeDepartment(request, h, request.params.id)
  }
];

module.exports = routes;
