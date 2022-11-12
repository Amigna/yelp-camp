// Run this file anytime changes are made to the data
// import { connect, connection } from "mongoose";
import pkg from "mongoose";
import mongoose from "mongoose";
import dotenv from "dotenv";
const { connection } = pkg;
import { cities } from "./cities.js";
import { places, descriptors } from "./seedHelpers.js";
import Campground from "../models/campground.js";
import connectDB from "../db/connect.js";
dotenv.config({ path: "../.env" });

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      // Your User ID
      // author: '6230f77af3664b3a1276d30c',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      image: "https://source.unsplash.com/collection/483251",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum culpa aut voluptas quisquam, placeat numquam molestiae quo rerum nihil perferendis, officiis temporibus porro optio laborum possimus facilis deleniti est eaque.",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      // images: [
      //     {
      //         url: '',
      //         filename: ''
      //     },
      //     {
      //         url: '',
      //         filename: ''
      //     }
      // ]
    });
    await camp.save();
  }
};

seedDB().then(() => {
  connection.close();
});
