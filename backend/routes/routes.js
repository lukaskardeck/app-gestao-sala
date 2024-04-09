const express = require("express");
const router = express.Router();
const HomeController = require("../controllers/HomeController");
const UserController = require("../controllers/UserController");
const ProfessorController = require("../controllers/ProfessorController");
const SetorController = require("../controllers/SetorController");

router.get("/", HomeController.index);
router.get("/teste", (req, res) => {
  res.json({ msg: "ola" });
});
router.post("/user", UserController.create);
router.post("/professor", ProfessorController.create);
router.post("/setor", SetorController.create);

module.exports = router;
