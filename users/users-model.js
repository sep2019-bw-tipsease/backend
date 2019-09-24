const db = require("../data/dbConfig.js");

module.exports = {
  add,
  find,
  findBy,
  findById,
  remove,
  findWorkers,
  addTip,
  findWorkerById
};

function find() {
  return db("users");
}

function findBy(filter) {
  return db("users").where(filter);
}

async function add(user) {
  const [id] = await db("users").insert(user);
  // console.log("findbyid", findById(id));
  return findById(id);
}

function findById(id) {
  return db("users")
    .select("username", "first_name", "last_name", "role")
    .where({ id })
    .first();
}

function findWorkerById(id) {
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

async function addTip(tip, id) {
  tip_total = await db("workerData")
    .where({ worker_id: id })
    .pluck("tip_total");
  const worker = await db("workerData")
    .where({ worker_id: id })
    .update("tip_total", Number(tip) + Number(tip_total));
}
