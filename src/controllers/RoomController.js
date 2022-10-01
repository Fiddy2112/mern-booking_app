const Hotel = require("../models/hotel");
const Room = require("../models/room");

class RoomController {
  /** Create
   * @route POST api/rooms/createRoom
   * @desc Room registration
   */
  async createRoom(req, res, next) {
    const hotelId = req.params.hotelId;
    const newRoom = new Room(req.body);
    try {
      const saveRoom = await newRoom.save();

      //The $push operator appends a specified value to an array.
      const options = {
        $push: {
          rooms: saveRoom._id,
        },
      };
      await Hotel.findByIdAndUpdate(hotelId, options);
      res.status(200).json({
        success: true,
        message: "Room created successfully!",
        saveRoom,
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
   * @route POST api/rooms/getRoom/:id
   * @desc Room registration
   */

  async getRoom(req, res) {
    const roomId = { _id: req.params.id };
    try {
      const room = await Room.findById(roomId);
      res.status(200).json({
        success: true,
        message: "Successfully room!",
        room,
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
   * @route POST api/rooms/getAllRoom
   * @desc Room registration
   */

  async getAllRoom(req, res) {
    const options = {
      //The $set operator replaces the value of a field with the specified value.
      $set: req.body,
    };
    try {
      const rooms = await Room.find(options);
      res.status(200).json({
        success: true,
        message: "Successfully all room!",
        rooms,
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
   * @route POST api/rooms/updateRoom/:id
   * @desc Room registration
   */

  async updateRoom(req, res) {
    const roomId = { _id: req.params.id };
    const options = {
      //The $set operator replaces the value of a field with the specified value.
      $set: req.body,
    };
    try {
      const updatedRoom = await Room.findByIdAndUpdate(roomId, options, {
        new: true,
      });

      res.status(200).json({
        success: true,
        message: "Successfully updated room!",
        updatedRoom,
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
   * @route POST api/rooms/deleteRoom/:id
   * @desc Room registration
   */

  async deleteRoom(req, res, next) {
    const roomId = { _id: req.params.id };
    const hotelId = req.params.hotelId;
    const options = {
      $pull: {
        rooms: req.params.id,
      },
    };
    try {
      await Room.findByIdAndDelete(roomId);

      try {
        await Hotel.findByIdAndDelete(hotelId, options);
      } catch (err) {
        next(err);
      }
      res.status(200).json({
        success: true,
        message: "Deleted room successfully!",
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

module.exports = new RoomController();
