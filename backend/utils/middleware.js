const logger = require("../utils/logger");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
};

const unknownEndpoint = (req, res) => {
  res.status(404).json({ error: "Unknown endpoint" });
};

const errorHandler = (error, req, res, next) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return res.status(400).json({ error: "malformatted id" });
  }

  if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }

  if (error.name === "JsonWebTokenError") {
    return res.status(401).json({ error: error.message });
  }

  if (error.name === "TokenExpiredError") {
    return res.status(401).json({
      error: "token expired",
    });
  }
  next(error);
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("Authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    req.token = authorization.replace("Bearer ", "");
  }
  next();
};

const userExtractor = async (req, res, next) => {
  try {
    if (req.token) {
      const decodedToken = jwt.verify(req.token, process.env.SECRET);
      if (decodedToken.id) {
        const user = await User.findById(decodedToken.id);
        req.user = user;
      }
    }
    next();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
