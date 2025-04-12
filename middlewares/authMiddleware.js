const Joi = require("joi");
const jwt = require("jsonwebtoken");

const userValidation = (req, res, next) => {
  const schema = Joi.object({
    phonenumber: Joi.string()
      .length(10)
      .pattern(/^[0-9]+$/)
      .required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Bad request", error });
  }
  next();
};

const verifyToken = (req, res, next) => {
  const bearer = req.headers["authorization"];
  if (!bearer)
    return res.status(401).json({ message: "Unauthorized: No token" });

  const token = bearer.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err)
      return res.status(403).json({ message: "Token invalid or expired" });

    req.user = decoded;
    next();
  });
};

module.exports = { userValidation, verifyToken };
