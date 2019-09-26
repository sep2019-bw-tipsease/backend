const db = require("../data/dbConfig.js");

module.exports = {
  addCustomer,
  getCustomers,
  findWorkerBy,
  findCustomerBy,
  getCustomerById,
  remove,
  getWorkers,
  addTip,
  getWorkerById,
  addWorker,
  addWorkerData
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

function addWorker(customer) {
  return db("customers")
    .insert(customer)
    .then(id => {
      return getCustomerById(id[0]);
    });
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

async function addTip(tip, id) {
  tip_total = await db("workerData")
    .where({ worker_id: id })
    .pluck("tip_total");
  const worker = await db("workerData")
    .where({ worker_id: id })
    .update("tip_total", Number(tip) + Number(tip_total));
}

async function addWorkerData(worker) {
  worker = await db("workerData")
    .pluck("time", "tagline", "job_title", "company")
    .update("worker.time", time)
    .update("worker.tagline", tagline)
    .update("worker.job_title", job_title)
    .update("worker.company", company);
}
