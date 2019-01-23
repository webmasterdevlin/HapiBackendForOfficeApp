const userService = require("../services/user.service");
const Joi = require("joi");
const Boom = require("boom");

async function retrieveUsers(request, h) {
  try {
    return h.response(await userService.getAllFromDb()).code(200);
  } catch (e) {
    return Boom.badImplementation(e);
  }
}

async function retrieveOneUser(request, h, id) {
  try {
    return h.response(await userService.getById(id)).code(200);
  } catch (e) {
    return Boom.badImplementation(e);
  }
}

async function saveUser(request, h) {
  const { error } = validate(request.payload);
  if (error) {
    return h.response(error.message).code(400);
  } else {
    try {
      await userService.add(request.payload);
      delete request.payload.password;
      delete request.payload.email;

      return h.response({ created: request.payload.username }).code(201);
    } catch (err) {
      return h.response(err.message).code(err.status);
    }
  }
}

async function updateUser(request, h, id) {
  const { error } = validate(request.payload);
  if (error) {
    return h.response(error.message).code(400);
  } else {
    try {
      return h
        .response(await userService.update(id, request.payload))
        .code(200);
    } catch (e) {
      return Boom.badImplementation(e);
    }
  }
}

async function removeUser(request, h, id) {
  try {
    return h.response(await userService.remove(id)).code(204);
  } catch (e) {
    return Boom.badImplementation(e);
  }
}

function validate(body) {
  const schema = {
    username: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required(),
    email: Joi.string().email({ minDomainAtoms: 2 }),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/)
  };
  return Joi.validate(body, schema);
}
module.exports = {
  retrieveUsers,
  retrieveOneUser,
  saveUser,
  updateUser,
  removeUser
};
