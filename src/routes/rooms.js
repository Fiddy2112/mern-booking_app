const express = require("express");
const RoomController = require("../controllers/RoomController");
const { verifyAdmin } = require("../utils/verifyToken");
const router = express.Router();

router.post("/createRoom/:hotelId", verifyAdmin, RoomController.createRoom);
router.put("/updateRoom/:id", verifyAdmin, RoomController.updateRoom);
router.delete(
  "/deleteRoom/:id/:hotelId",
  verifyAdmin,
  RoomController.deleteRoom
);
router.get("/getRoom/:id", RoomController.getRoom);
router.get("/getAllRoom", RoomController.getAllRoom);

module.exports = router;
