const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoomSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    maxPeople: {
      type: Number,
      required: true,
    },
    roomNumbers: [{ number: Number, unavailableDates: { type: [Date] } }],
  },
  {
    timestamps: true,
  }
);

// [{ number: 101, unavailableDates: ["02.03.2021", "02.05.2021"] }];

module.exports = mongoose.model("rooms", RoomSchema);
