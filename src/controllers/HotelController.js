const Hotel = require("../models/hotel");
const Room = require("../models/room");
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
   * @route POST api/hotels/getAllHotel?query_params
   * @desc Hotel registration
   */
  async getAllHotel(req, res) {
    //The $set operator replaces the value of a field with the specified value.
    // const options = {
    //   $set: req.body,
    // };

    const { min, max, ...other } = req.query;
    try {
      const hotels = await Hotel.find({
        ...other,
        cheapestPrice: { $gt: min | 1, $lt: max || 999 },
      }).limit(req.query.limit);
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

  /** POST
   * @route POST api/hotels/countByCity
   * @desc count by city
   */
  async countByCity(req, res) {
    const cities = req.query.cities.split(",");
    try {
      const listCity = await Promise.all(
        cities.map((city) => {
          return Hotel.countDocuments({
            city: city,
          });
        })
      );
      res.status(200).json({
        success: true,
        message: " cities successfully!",
        data: listCity,
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

  /** POST
   * @route POST api/hotels/countByType
   * @desc count by type
   */
  async countByType(req, res) {
    try {
      const hotelCount = await Hotel.countDocuments({ type: "hotel" });
      const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
      const resortCount = await Hotel.countDocuments({ type: "resort" });
      const villaCount = await Hotel.countDocuments({ type: "villa" });

      res.status(200).json({
        success: true,
        data: [
          { type: "hotel", count: hotelCount },
          { type: "apartment", count: apartmentCount },
          { type: "resort", count: resortCount },
          { type: "villa", count: villaCount },
        ],
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

  async hotelRooms(req, res, next) {
    const hotelId = { _id: req.params.id };
    try {
      const hotel = await Hotel.findById(hotelId);
      const listRoom = await Promise.all(
        hotel.rooms.map((room) => {
          return Room.findById(room);
        })
      );

      res.status(200).json({
        success: true,
        message: "Successfully room in hotel!",
        listRoom,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new HotelController();
