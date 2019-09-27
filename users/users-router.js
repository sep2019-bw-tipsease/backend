const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const restricted = require("./restricted");
const db = require("../data/dbConfig.js");

const Users = require("./users-model.js");

router.post("/register/worker", (req, res) => {
  let worker = req.body;
  const hash = bcrypt.hashSync(worker.password, 10);
  worker.password = hash;

  Users.addWorker(worker)
    .then(newWorker => {
      res.status(201).json(newWorker);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.post("/register/customer", (req, res) => {
  let customer = req.body;
  const hash = bcrypt.hashSync(customer.password, 10);
  customer.password = hash;

  Users.addCustomer(customer)
    .then(newCustomer => {
      res.status(201).json(newCustomer);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.post("/workerlogin", (req, res) => {
  let { username, password } = req.body;

  Users.findWorkerBy({ username })
    .first()
    .then(worker => {
      if (worker && bcrypt.compareSync(password, worker.password)) {
        const token = generateToken(worker);
        res.status(200).json({
          worker,
          message: `Welcome ${worker.username}!`,
          token
        });
      } else {
        res.status(401).json({ message: "error logging in" });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json(error.message);
    });
});

router.post("/customerlogin", (req, res) => {
  let { username, password } = req.body;

  Users.findCustomerBy({ username })
    .first()
    .then(customer => {
      if (customer && bcrypt.compareSync(password, customer.password)) {
        const token = generateToken(customer);
        res.status(200).json({
          message: `Welcome ${customer.username}!`,
          token
        });
      } else {
        res.status(401).json({ message: "error logging in" });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json(error.message);
    });
});

router.get("/customers", (req, res) => {
  Users.getCustomers()
    .then(customers => {
      res.status(200).json(customers);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Failed to get customers" });
    });
});

router.get("/workers", restricted, (req, res) => {
  Users.getWorkers()
    .then(workers => {
      res.status(200).json(workers);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/workers/:id", restricted, (req, res) => {
  const { id } = req.params;
  Users.getWorkerById(id)
    .then(worker => {
      res.status(200).json(worker);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "error getting this worker" });
    });
});

router.get("/customers/:id", restricted, (req, res) => {
  const { id } = req.params;
  Users.getCustomerById(id)
    .then(customer => {
      res.status(200).json(customer);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "error getting this customer" });
    });
});

router.put("/workers/:id", restricted, (req, res) => {
  const { id } = req.params;
  const updatedInfo = req.body;

  Users.updateWorker(id, updatedInfo)
    .then(updatedWorker => {
      res.status(200).json(updatedWorker);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "error adding tip" });
    });
});

router.put("/workers/:id/tips", restricted, (req, res) => {
  const { id } = req.params;
  const { tip } = req.body;

  Users.getTipTotal(id)
    .then(currentTips => {
      const newTotal = Number(currentTips.tip_total) + Number(tip);
      return newTotal;
    })
    .then(currentTotal => {
      console.log(currentTotal);
      return Users.updateTip(currentTotal, id);
    })
    .then(currentTotal => {
      console.log(currentTotal);
      res.status(200).json(currentTotal);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "error adding tip" });
    });
});

// router.put("/workers/:id/tips", restricted, (req, res) => {
//   const { id } = req.params;
//   const { tip } = req.body;

//   db("workers")
//     .where({ id })
//     .select("tip_total")
//     .increment("tip_total", tip)
//     .then(tip => {
//       res.status(201).json({
//         message: `You have successfully tipped!`
//       });
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({ error: "error adding tip" });
//     });
// });

function generateToken(user) {
  const payload = {
    sub: user.id,
    username: user.username
  };
  const options = {
    expiresIn: "10d"
  };

  return jwt.sign(payload, process.env.JWT_SECRET, options);
}

module.exports = router;
