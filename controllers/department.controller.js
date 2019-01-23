const departmentService = require("../services/department.service");
const Joi = require("joi");
const Boom = require("boom");

async function retrieveDepartments(request, h) {
  try {
    return h.response(await departmentService.getAllFromDb()).code(200);
  } catch (e) {
    return Boom.badImplementation(e);
  }
}

async function retrieveOneDepartment(request, h, id) {
  try {
    return h.response(await departmentService.getById(id)).code(200);
  } catch (e) {
    return Boom.badImplementation(e);
  }
}

async function saveDepartment(request, h) {
  const { error } = validate(request.payload);
  if (error) {
    return h.response(error.message).code(400);
  } else {
    try {
      return h.response(await departmentService.add(request.payload)).code(201);
    } catch (err) {
      return Boom.badImplementation(e);
    }
  }
}

async function updateDepartment(request, h, id) {
  const { error } = validate(request.payload);
  if (error) {
    return h.response(error.message).code(400);
  } else {
    try {
      return h
        .response(await departmentService.update(id, request.payload))
        .code(200);
    } catch (e) {
      return Boom.badImplementation(e);
    }
  }
}

async function removeDepartment(request, h, id) {
  try {
    return h.response(await departmentService.remove(id)).code(204);
  } catch (e) {
    return Boom.badImplementation(e);
  }
}

function validate(body) {
  const schema = {
    name: Joi.string()
      .min(2)
      .max(12),
    description: Joi.string()
      .min(6)
      .max(244),
    head: Joi.string()
      .min(6)
      .max(244),
    code: Joi.string()
      .min(2)
      .max(12)
  };
  return Joi.validate(body, schema);
}

module.exports = {
  retrieveDepartments,
  retrieveOneDepartment,
  saveDepartment,
  updateDepartment,
  removeDepartment
};
