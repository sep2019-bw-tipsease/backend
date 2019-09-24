const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const restricted = require("./restricted");

const Users = require("./users-model.js");

router.get("/", restricted, (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Failed to get users" });
    });
});

router.post("/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Users.add(user)
    .then(saved => {
      const token = generateToken(saved);
      res.status(201).json({
        saved,
        token
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "error adding a new user" });
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({
          message: `Welcome ${user.username}!`,
          token
        });
      } else {
        res.status(401).json({ message: "error logging in" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get("/workers", restricted, (req, res) => {
  Users.findWorkers()
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
  Users.findWorkerById(id)
    .then(worker => {
      res.status(200).json(worker);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "error getting this worker" });
    });
});

router.put("/workers/:id/", restricted, (req, res) => {
  const { id } = req.params;
  const { tip } = req.body;

  return Users.findById(id)
    .then(async worker => {
      worker.tip_total = await Users.addTip(tip, id);

      res.status(200).json(worker.tip_total);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "error adding tip" });
    });
});

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
