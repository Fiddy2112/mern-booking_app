require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./config/db/db");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const hotelRoute = require("./routes/hotels");
const roomRoute = require("./routes/rooms");
const cookieParser = require("cookie-parser");

const port = process.env.PORT || 8080;

app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/hotels", hotelRoute);
app.use("/api/rooms", roomRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(port, () => {
  //connected to mongoDB

  db.connect();

  // connected to server
  console.log(`Connected to backend on port ${port}!`);
});
