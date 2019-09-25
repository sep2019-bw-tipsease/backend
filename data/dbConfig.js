const knex = require("knex");

const knexConfig = require("../knexfile.js");

const DB_ENV = process.env.DB_ENV || "development";

module.exports = knex(knexConfig[DB_ENV]);
