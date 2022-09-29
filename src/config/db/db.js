const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect("mongodb://localhost:27017/mern-booking_app");
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log("Connect failure!!");
  }
}

mongoose.connection.on("connected", () => {
  console.log("MongoDB Connected");
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB Disconnected");
});

module.exports = { connect };
