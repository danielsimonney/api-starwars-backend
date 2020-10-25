const express = require("express"),
  router = express.Router(),
  bodyParser = require("body-parser"),
jwt = require("jsonwebtoken")


router.post("/starwars/login", async (request, response) => {
  console.log(request.body)
  if (request.body.username=="Luke" && request.body.password=="DadSucks") {
    response.json({
      status: 200,
      token: jwt.sign(
        { username:request.body.username, exp: Math.floor(Date.now() / 1000) + 60 * 300 },
        process.env.SECRET
      )
    });
  } else {
    response.json({ status: 400 });
  }
});


module.exports = router;