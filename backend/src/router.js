const express = require("express");

const router = express.Router();

const { verifyPseudo, verifyPassword, hashPassword } = require("./auth");

const itemControllers = require("./controllers/itemControllers");
const userControllers = require("./controllers/userControllers");

router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);

router.post("/signup", verifyPseudo, hashPassword, userControllers.add);
router.post("/login", userControllers.login, verifyPassword);

router.get("/users", userControllers.browse);

module.exports = router;
