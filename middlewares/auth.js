const express = require("express"),
router = express.Router(),
jwt = require("express-jwt");

router.use(
  jwt({
    secret: process.env.SECRET,
    algorithms: ["HS256"]
  }).unless(req => {
    console.log("req");
    return (
      (req.originalUrl === "/starwars/login" && req.method === "POST")
    );
  })
);

router.use((err, req, res, next) => {
  console.log("middleware")
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ status: 401, msg: "invalid token..." });
  }
});


module.exports = router;
