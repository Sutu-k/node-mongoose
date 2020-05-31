const jwt = require("jsonwebtoken");
const JWT_SECRET = 'change-this-secret'

const createToken = (user = {}) => {

  return jwt.sign(
    {
      firstName: user.firstName,
      email: user.email,
    },
    JWT_SECRET,
    {
      algorithm: "HS256",
      expiresIn: 3600
    }
  );
};

const verifyToken = token => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
      if (err || !decodedToken) {
        reject(err);
      } else {
        resolve(decodedToken);
      }
    });
  });
};

module.exports = {
  createToken,
  verifyToken
}