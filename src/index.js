require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./config/db/db");
const authRoute = require("./routes/auth");
const hotelRoute = require("./routes/hotels");

const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoute);
app.use("/api/users", authRoute);
app.use("/api/hotels", hotelRoute);
app.use("/api/rooms", authRoute);

app.listen(port, () => {
  //connected to mongoDB

  db.connect();

  // connected to server
  console.log(`Connected to backend on port ${port}!`);
});
