const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

authUser = (req, res, next) => {
  const token = req.headers.authorization;
  jwt.verify(token, jwtSecret, (err, decode) => {
    if(err) return res.send({
        message: "Something Went Wrong Please Verify the token",
        status: 2,
    })
    if (decode) {
      req.body.user = decode.userId;
      next();
    } else {
      res.send({
        message: "Token is not valid please Login",
        status: 2,
      });
    }
  });
};

module.exports={
    authUser
}
