const express = require("express");
const HotelController = require("../controllers/HotelController");
const router = express.Router();

router.post("/createHotel", HotelController.createHotel);
router.put("/updateHotel/:id", HotelController.updateHotel);
router.delete("/deleteHotel/:id", HotelController.deleteHotel);
router.get("/getHotel/:id", HotelController.getHotel);
router.get("/getAllHotel", HotelController.getAllHotel);

module.exports = router;
