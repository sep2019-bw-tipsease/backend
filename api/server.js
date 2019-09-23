const express = require("express");
require("dotenv").config();

const usersRouter = require("../users/users-router");
// const authenticate = require("../auth/authenticate-middleware.js");

const server = express();

server.use(express.json());

server.use("/api/users", usersRouter);

server.get("/", (req, res) => {
  res.send("server is up!");
});

module.exports = server;
