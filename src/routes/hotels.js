const express = require("express");
const HotelController = require("../controllers/HotelController");
const { verifyAdmin } = require("../utils/verifyToken");
const router = express.Router();

router.post("/createHotel", verifyAdmin, HotelController.createHotel);
router.put("/updateHotel/:id", verifyAdmin, HotelController.updateHotel);
router.delete("/deleteHotel/:id", verifyAdmin, HotelController.deleteHotel);
router.get("/getAllHotel", HotelController.getAllHotel);
router.get("/countByType", HotelController.countByType);
router.get("/countByCity", HotelController.countByCity);
router.get("/getHotel/:id", HotelController.getHotel);
router.get("/room/:id", HotelController.hotelRooms);

module.exports = router;
