const dayjs = require("dayjs");
const jwt = require("jsonwebtoken");

const createToken = (user) => {
  const obj = {
    userId: user.id,
    userRole: user.rol,
    exp: dayjs().add(8, "hours").unix(),
  };
  return jwt.sign(obj, "esta es la verificación del token");
};

module.exports = {
  createToken,
};
