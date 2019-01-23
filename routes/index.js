const departments = require("./department.router");
const users = require("./user.router");
const auth = require("../auth/auth.router");

let routes = [];
routes = routes.concat(departments);
routes = routes.concat(users);
routes = routes.concat(auth);

module.exports = routes;
