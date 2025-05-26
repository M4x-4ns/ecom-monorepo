const express = require("express");
const router = express.Router();
// import controller
const { register, login, currentuser } = require("../controllers/auth");
// import Middleware
const { authCheck, adminCheck } = require("../middlewares/authCheck");

router.post("/register", register);
router.post("/login", login);
router.post("/current-user", authCheck, currentuser);
router.post("/current-admin", authCheck, adminCheck, currentuser);

module.exports = router;
