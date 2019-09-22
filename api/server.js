const express = require("express");
require("dotenv").config();

const authenticate = require("../auth/authenticate-middleware.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send("servers up!");
});

module.exports = server;
