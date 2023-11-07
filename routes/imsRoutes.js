const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const itemController = require("../controllers/itemController");
const societyController = require("../controllers/societyController");
const requirementController = require("../controllers/requirementController");
const deliveryReturnsController = require("../controllers/deliveryReturnsController");
const dashboardController = require("../controllers/dashboardController");
const signController = require("../controllers/signController");

router.get("/", (req, res) => {
  res.render("signin", { message: null });
});

router.get("/addUser", (req, res) => {
  res.render("addUser", { message: null });
});

router.get("/addItem", (req, res) => {
  res.render("addItem", { message: null });
});

router.get("/addSociety", (req, res) => {
  res.render("addSociety", { message: null });
});

router.get("/addRequirement", (req, res) => {
  res.render("addRequirement", { message: null });
});

router.get("/signin", signController.signIn);

router.get("/dashboard", dashboardController.getDashboardData);

router.get("/user", userController.getUser);

router.post("/createUser", userController.createUser);

router.get("/updateUser", userController.readUser);

router.post("/updateUser", userController.updateUser);

router.post("/deleteUser", userController.deleteUser);

router.get("/item", itemController.getItem);

router.post("/createItem", itemController.createItem);

router.get("/updateItem", itemController.readItem);

router.post("/updateItem", itemController.updateItem);

router.post("/deleteItem", itemController.deleteItem);

router.get("/society", societyController.getSociety);

router.post("/createSociety", societyController.createSociety);

router.get("/societyRequirement", requirementController.getRequirement);

router.post(
  "/createSocietyRequirement",
  requirementController.createRequirement
);

router.get("/deliveryReturns", deliveryReturnsController.getDeliveryReturns);

module.exports = router;
