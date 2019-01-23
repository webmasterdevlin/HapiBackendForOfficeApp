const authService = require("../auth/auth.service");
const Boom = require("boom");

async function authUser(request, h) {
  try {
    const user = await authService.verifyUser(request.payload);

    if (user) {
      const createdJwt = await authService.sign(
        request.payload.email,
        request.payload.password
      );

      return h
        .response(createdJwt)
        .header("x-auth-token", createdJwt.token)
        .code(200);
    }
  } catch (e) {
    return Boom.badImplementation(e);
  }
}

module.exports = {
  authUser
};
