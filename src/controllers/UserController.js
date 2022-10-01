const User = require("../models/user");

class UserController {
  /** Read
   * @route POST api/users/getUser/:id
   * @desc Hotel registration
   */
  async getUser(req, res) {
    const userId = { _id: req.params.id };
    try {
      const user = await User.findById(userId);
      res.status(200).json({
        success: true,
        message: "Successfully user!",
        user,
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

  /** Read All
   * @route POST api/users/getAllUser
   * @desc Hotel registration
   */
  async getAllUser(req, res) {
    const options = {
      //The $set operator replaces the value of a field with the specified value.
      $set: req.body,
    };
    try {
      const users = await User.find(options);
      res.status(200).json({
        success: true,
        message: "Successfully all user!",
        users,
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
   * @route POST api/users/updateUser/:id
   * @desc Hotel registration
   */
  async updateUser(req, res) {
    const userId = { _id: req.params.id };
    const options = {
      //The $set operator replaces the value of a field with the specified value.
      $set: req.body,
    };
    try {
      const updatedUser = await User.findByIdAndUpdate(userId, options, {
        new: true,
      });
      res.status(200).json({
        success: true,
        message: "Successfully updated user!",
        updatedUser,
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
   * @route POST api/users/deleteUser/:id
   * @desc Hotel registration
   */
  async deleteUser(req, res) {
    const userId = { _id: req.params.id };
    try {
      await User.findByIdAndDelete(userId);
      res.status(200).json({
        success: true,
        message: "Deleted user successfully!",
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

module.exports = new UserController();
