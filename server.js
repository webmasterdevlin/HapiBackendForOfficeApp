require("dotenv").config();
const winston = require("winston");
const Hapi = require("hapi");
const server = Hapi.server({
  port: 5000,
  host: "localhost",
  router: {
    stripTrailingSlash: true
  }
});

const init = async () => {
  await server.register({
    plugin: require("./plugins/auth")
  });

  await server.register({
    plugin: require("hapi-pino"),
    options: {
      prettyPrint: true,
      logEvents: ["response"]
    }
  });

  await server.register({
    plugin: require("./plugins/database")
  });

  await server.register({
    plugin: require("./plugins/routes"),
    routes: {
      prefix: "/api"
    }
  });

  await server.register([require("vision"), require("inert"), require("lout")]);

  await server.start();
  winston.info(`Server running at: ${server.info.uri}`);
};

process.on("unhandledRejection", err => {
  winston.info(err);
  process.exit(1);
});

init();
