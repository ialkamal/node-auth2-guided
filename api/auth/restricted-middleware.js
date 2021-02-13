const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets");

module.exports = (req, res, next) => {
  // add code here to verify users are logged in
  // Bearer <token>
  const token = req.headers?.authorization?.split(" ")[1];

  console.log(secrets.jwtSecret);

  if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      console.log(decodedToken);
      if (err) {
        res.status(401).json({ you: "shall not pass" });
      } else {
        req.decodedJWT = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ you: "shall not pass" });
  }
};
