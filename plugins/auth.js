const jwtPlugin = require("hapi-auth-jwt2").plugin;

const validate = credentials =>
  // Run any checks here to confirm we want to grant these credentials access
  ({
    isValid: true,
    credentials // request.auth.credentials
  });
exports.plugin = {
  name: "auth",
  version: "1",
  register: server => {
    server.register(jwtPlugin);

    server.auth.strategy("admin", "jwt", {
      key: process.env.SECRET,
      validate: validate,
      verifyOptions: { algorithms: ["HS256"] }
    });

    server.auth.default("admin"); // default all routes to require JWT and opt for public routes
  }
};
