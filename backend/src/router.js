const express = require("express");

const router = express.Router();

const { verifyPseudo, verifyPassword, hashPassword } = require("./auth");

const itemControllers = require("./controllers/itemControllers");
const userControllers = require("./controllers/userControllers");
const cityControllers = require("./controllers/cityControllers");
const scoreControllers = require("./controllers/scoreControllers");
const { fetchApi, fetchApiNoParams } = require("./fetchApi");

router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);

router.post("/signup", verifyPseudo, hashPassword, userControllers.add);
router.post("/login", userControllers.login, verifyPassword);

router.get("/users", userControllers.browse);

router.post("/cities/:value", fetchApi, cityControllers.add);
router.post("/cities", fetchApiNoParams, cityControllers.add);
router.get("/cities", cityControllers.browse);

// protected routes

router.put("/city/:id/isused", cityControllers.setIsUsed);
router.put("/cities/resetusage", cityControllers.resetUsage);
router.get("/cities/random", cityControllers.randomCities);

router.post("/score/:userID/:score", scoreControllers.add);

module.exports = router;
