const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

function getAllFromDb() {
  return User.find({}).select("-password");
}

function getById(id) {
  return User.findById(id).select("-password");
}

// This is async/await implementation
async function add(newUser) {
  // validate
  if (!newUser.password) throw "Password is required";
  if (await User.findOne({ username: newUser.username }))
    throw {
      message: `username already taken`,
      status: 400
    };

  const user = new User({
    username: newUser.username,
    email: newUser.email,
    password: await bcrypt.hash(newUser.password, await bcrypt.genSalt(10))
  });

  try {
    return await (rawResult = user.save());
  } catch (e) {
    throw {
      e,
      status: 500
    };
  }
}

async function update(id, body) {
  try {
    await User.findOneAndUpdate({ _id: id }, body, {
      new: true
    });
  } catch (error) {
    return error;
  }
}

async function remove(id) {
  try {
    await User.findOneAndDelete({ _id: id });
  } catch (error) {
    return error;
  }
}

module.exports = {
  getAllFromDb,
  getById,
  add,
  update,
  remove
};
