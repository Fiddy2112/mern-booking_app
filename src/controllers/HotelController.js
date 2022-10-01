const Hotel = require("../models/hotel");
const createError = require("../utils/error");

class HotelController {
  /** CREATE
   * @route POST api/hotels/createHotel
   * @desc Hotel registration
   */
  async createHotel(req, res) {
    const newHotel = new Hotel(req.body);
    try {
      const saveHotel = await newHotel.save();
      res.status(200).json({
        success: true,
        message: "Successfully new hotel!",
        saveHotel,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        err,
      });
    }
  }

  /** Read
   * @route POST api/hotels/getHotel/:id
   * @desc Hotel registration
   */
  async getHotel(req, res) {
    const hotelId = { _id: req.params.id };
    try {
      const hotel = await Hotel.findById(hotelId);
      res.status(200).json({
        success: true,
        message: "Successfully hotel!",
        hotel,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        err,
      });
    }
  }

  /** Read
   * @route POST api/hotels/getAllHotel
   * @desc Hotel registration
   */
  async getAllHotel(req, res) {
    const options = {
      //The $set operator replaces the value of a field with the specified value.
      $set: req.body,
    };
    try {
      const hotels = await Hotel.find(options);
      res.status(200).json({
        success: true,
        message: "Successfully all hotel!",
        hotels,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        err,
      });
    }
  }

  /** Update
   * @route POST api/hotels/updateHotel/:id
   * @desc Hotel registration
   */
  async updateHotel(req, res) {
    const hotelId = { _id: req.params.id };
    const options = {
      //The $set operator replaces the value of a field with the specified value.
      $set: req.body,
    };
    try {
      const updatedHotel = await Hotel.findByIdAndUpdate(hotelId, options, {
        new: true,
      });
      res.status(200).json({
        success: true,
        message: "Successfully updated hotel!",
        updatedHotel,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        err,
      });
    }
  }

  /** Delete
   * @route POST api/hotels/deleteHotel/:id
   * @desc Hotel registration
   */
  async deleteHotel(req, res) {
    const hotelId = { _id: req.params.id };
    try {
      await Hotel.findByIdAndDelete(hotelId);
      res.status(200).json({
        success: true,
        message: "Deleted hotel successfully!",
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        err,
      });
    }
  }
}

module.exports = new HotelController();
