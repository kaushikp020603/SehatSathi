const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    // Check if Authorization header exists
    if (!req.headers["authorization"]) {
      return res.status(401).send({
        message: "Authorization header missing",
        success: false,
      });
    }

    const token = req.headers["authorization"].split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Auth Failed",
          success: false,
        });
      } else {
        req.body.userId = decoded._id;
        next();
      }
    });
  } catch (error) {
    return res.status(401).send({
      message: "Auth Failed",
      success: false,
    });
  }
};
