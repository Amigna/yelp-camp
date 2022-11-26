// Run this file anytime changes are made to the data
import pkg from "mongoose";
import mongoose from "mongoose";
import dotenv from "dotenv";
const { connection } = pkg;
import { cities } from "./cities.js";
import { places, descriptors } from "./seedHelpers.js";
import Campground from "../models/campground.js";
import connectDB from "../db/connect.js";
dotenv.config({ path: "../.env" });

// mongoose.connect(process.env.MONGO_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const db = connection;
// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", () => {
//   console.log("Database connected");
// });

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    console.log("Database connected!");
  } catch (error) {
    console.log(error);
  }
};
start();

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      // Your User ID
      author: "637962aa68553ccedfa319c9",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      // image: "https://source.unsplash.com/collection/483251",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum culpa aut voluptas quisquam, placeat numquam molestiae quo rerum nihil perferendis, officiis temporibus porro optio laborum possimus facilis deleniti est eaque.",
      price,
      geometry: {
        type: "Point",
        coordinates: [-113.1331, 47.0202],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dao3ibtdp/image/upload/v1669173759/YelpCamp/yuyxr4ymyhw5b6mfvp5h.jpg",
          filename: "YelpCamp/yuyxr4ymyhw5b6mfvp5h",
        },
        {
          url: "https://res.cloudinary.com/dao3ibtdp/image/upload/v1669173762/YelpCamp/km7pdauwr6at9ixhv7zu.jpg",
          filename: "YelpCamp/km7pdauwr6at9ixhv7zu",
        },
        {
          url: "https://res.cloudinary.com/dao3ibtdp/image/upload/v1669174632/YelpCamp/jay3nuob7ktju2udbevu.jpg",
          filename: "YelpCamp/jay3nuob7ktju2udbevu",
        },
        {
          url: "https://res.cloudinary.com/dao3ibtdp/image/upload/v1669174639/YelpCamp/zwtelbehxr2hon8hgqd6.jpg",
          filename: "YelpCamp/zwtelbehxr2hon8hgqd6",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  connection.close();
});
