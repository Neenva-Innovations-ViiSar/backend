const Joi = require("joi");
const jwt = require("jsonwebtoken");


const userValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(), // Only validate name for the first step
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Bad request", error: error.details });
  }
  next();
};

const passwordValidation = (req, res, next) => {
  const schema = Joi.object({
    userId: Joi.string().required(), // Allowing userId now
    password: Joi.string().min(4).required()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Bad request", error: error.details });
  }

  next();
};

const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Bad request", error: error.details });
  }
  next();
};


function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // this should contain { id: user._id }
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token." });
  }
}



module.exports = { userValidation, verifyToken, passwordValidation, loginValidation};
