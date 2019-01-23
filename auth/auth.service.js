const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const LoginUser = require("../models/user.model");

function verifyUser(userParam) {
  const user = LoginUser.findOne({ email: userParam.email });

  return !!user;
}

async function sign(userEmail, userPassword) {
  const user = await LoginUser.findOne({ email: userEmail });
  if (!user) throw Error("Can't find user");

  const valid = await bcrypt.compare(userPassword, user.password);
  if (!valid) throw Error("Can't authenticate user");

  const token = jwt.sign({ sub: user._id }, process.env.SECRET, {
    expiresIn: "1h"
  });
  return { token };
}

module.exports = {
  verifyUser,
  sign
};
