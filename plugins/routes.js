exports.plugin = {
  async register(server, options) {
    server.route(require("../routes/index"));
  },
  name: "all-routes"
};
