const db = require("../data/dbConfig");
const Model = require("./users-model");
const Router = require("./users-router");
const request = require("supertest");
const server = require("../api/server");

describe("users stuff", () => {
  describe("addCustomer", () => {
    beforeEach(async () => {
      await db("customers").truncate();
    });

    it("should insert a user into the db", async () => {
      await Model.addCustomer({
        username: "test",
        password: "test",
        first_name: "test",
        last_name: "test"
      });

      const customers = await db("customers");
      expect(customers).toHaveLength(1);
    });
  });

  describe("router stuff", () => {
    it("should get workers", () => {
      return request(server)
        .get("/")
        .then(res => {
          expect(res.status).toBe(200);
        });
    });
  });
});
