const express = require("express"),
bodyParser = require("body-parser");
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
require('dotenv').config();
const cors = require("cors");
const app = express(),
authorizationMiddleware = require("./middlewares/auth");
home = require("./routes/species");
auth= require("./routes/auth")

const server = require("http").createServer(app);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(authorizationMiddleware);
app.use(auth)
app.use(home);

server.listen(3000);



