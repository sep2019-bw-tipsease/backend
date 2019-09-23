const db = require("../data/dbConfig.js");

module.exports = {
  add,
  find,
  findBy,
  findById,
  remove,
  findWorkers
};

function find() {
  return db("users");
}

function findBy(filter) {
  return db("users").where(filter);
}

async function add(user) {
  const [id] = await db("users").insert(user);

  return findById(id);
}

function findById(id) {
  return db("users")
    .join("workerData", "worker_id", "id")
    .select(
      "username",
      "first_name",
      "last_name",
      "image",
      "time",
      "tagline",
      "job_title",
      "company",
      "tip_total"
    )
    .where({ role: "worker", id })
    .first();
}

function remove(id) {
  return db("users")
    .where({ id })
    .del();
}

function findWorkers() {
  return db("users")
    .join("workerData", "worker_id", "id")
    .select(
      "username",
      "first_name",
      "last_name",
      "image",
      "time",
      "tagline",
      "job_title",
      "company",
      "tip_total"
    )
    .where({ role: "worker" });
}

function addTip(id, tip) {
  const { id } = req.params;
  let { tip } = req.body;
}
