const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

mongoose.set("strictQuery", false);

var mongoURL =
  "mongodb+srv://megan:megan@cluster0.lfo8q5x.mongodb.net/server-uinjek";

mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true });

var connection = mongoose.connection;

connection.on("error", () => {
  console.log("Mongo DB Connection Failed");
});

connection.on("connected", () => {
  console.log("Mongo DB Connection Success");
});

const app = express();

app.use(cors());

app.use(express.json());

const adminsRoute = require("./routes/adminsRoute");
const driversRoute = require("./routes/driversRoute");
const pelanggansRoute = require("./routes/pelanggansRoute");
const ordersRoute = require("./routes/ordersRoutes");

app.get("/", async (req, res, next) => {
  return res.status(200).json({
    title: "Express Testing",
    message: "The app is working properly!",
  });
});

app.use("/api/admins", adminsRoute);
app.use("/api/drivers", driversRoute);
app.use("/api/pelanggans", pelanggansRoute);
app.use("/api/orders", ordersRoute);

app.listen(3000, () => {
  console.log("Server uinjek is running on port 3000");
});

module.exports = app;
