const db = require("../data/dbConfig.js");

module.exports = {
  addCustomer,
  getCustomers,
  findWorkerBy,
  findCustomerBy,
  getCustomerById,
  remove,
  getWorkers,
  updateTip,
  getWorkerById,
  addWorker,
  updateWorker,
  getTipTotal
};

function getCustomers() {
  return db("customers");
}

function getWorkers() {
  return db("workers");
}

function findWorkerBy(filter) {
  return db("workers").where(filter);
}

function findCustomerBy(filter) {
  return db("customers").where(filter);
}

// async function addCustomer(customer) {
//   const [id] = await db("customers").insert(customer);
//   return getCustomerById(id);
// }

function addCustomer(customer) {
  return db("customers")
    .insert(customer)
    .then(id => {
      return getCustomerById(id[0]);
    });
}

function addWorker(worker) {
  return db("workers").insert(worker);
  // .then(id => {
  //   return getWorkerById(id[0]);
  // });
}

// async function addWorker(worker) {
//   const [id] = await db("workers").insert(worker);
//   return getWorkerById(id);
// }

function getCustomerById(id) {
  return db("customers")
    .where({ id })
    .first();
}

function getWorkerById(id) {
  return db("workers")
    .where({ id })
    .first();
}

function remove(id) {
  return db("users")
    .where({ id })
    .del();
}

function getTipTotal(id) {
  return db("workers")
    .where({ id })
    .select("tip_total")
    .first();
}

function updateTip(tip, id) {
  return db("workers")
    .where({ id })
    .update("tip_total", Number(tip));
}

function updateWorker(id, updateInfo) {
  return db("workers")
    .where({ id })
    .update("time", updateInfo.time)
    .update("tagline", updateInfo.tagline)
    .update("job_title", updateInfo.job_title)
    .update("company", updateInfo.company)
    .then(() => {
      return getWorkerById(id);
    });
}
