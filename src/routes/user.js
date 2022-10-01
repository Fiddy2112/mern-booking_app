const express = require("express");
const UserController = require("../controllers/UserController");
const {
  verifyToken,
  verifyUser,
  verifyAdmin,
} = require("../utils/verifyToken");
const router = express.Router();

// router.get("/checkAuthentication", verifyToken, (req, res, next) => {
//   res.send("Hi user, you are logged in!");
// });
// router.get("/checkUser/:id", verifyUser, (req, res, next) => {
//   res.send("Hi user, you are logged in and u delete account!");
// });
// router.get("/checkAmin/:id", verifyAdmin, (req, res, next) => {
//   res.send("Hi admin, you are logged in and delete all account!");
// });

router.put("/updateUser/:id", verifyUser, UserController.updateUser);
router.delete("/deleteUser/:id", verifyUser, UserController.deleteUser);
router.get("/getUser/:id", verifyUser, UserController.getUser);
router.get("/getAllUser", verifyAdmin, UserController.getAllUser);

module.exports = router;
