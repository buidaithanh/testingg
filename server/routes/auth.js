const verifyToken = require("../middleware/auth");
const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");

router.get("/", authController.getLogin);
router.get("/", verifyToken, authController.checkUserLogin);
router.post("/register", authController.Register);
router.post("/login", authController.Login);

module.exports = router;
