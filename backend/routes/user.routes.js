const express = require("express");
const protectRoute = require("../middleware/protectRoute.js");
const getSidebarUsers = require("../controllers/user.controller.js");

const router = express.Router();

router.get("/", protectRoute, getSidebarUsers);

module.exports = router;
