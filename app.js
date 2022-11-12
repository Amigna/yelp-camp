import express from "express";
// import mongoose from "mongoose";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "node:url";
import Campground from "./models/campground.js";

import connectDB from "./db/connect.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// mongoose.connect("mongodb://localhost:27017/yelp-camp", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", () => {
//   console.log("Database connected!");
// });

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/campground", async (req, res) => {
  const camp = new Campground({
    title: "My Backyard",
    price: "100",
    description: "Beautiful",
    location: "Phoenix",
  });
  await camp.save();
  res.send(camp);
});

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    console.log("Database connected!");
    app.listen(3000, () => {
      console.log("Serving on port 3000!");
    });
  } catch (error) {
    console.log(error);
  }
};

start();
