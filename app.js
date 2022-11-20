import express from "express";
// import mongoose from "mongoose";
import path from "path";
import dotenv from "dotenv";
import methodOverride from "method-override";
import { fileURLToPath } from "node:url";
import ejsMate from "ejs-mate";
import { ExpressError } from "./utils/ExpressError.js";
import session from "express-session";
import flash from "connect-flash";
import passport from "passport";
import LocalStrategy from "passport-local";

import userRoutes from "./routes/users.js";
import campgroundRoutes from "./routes/campgrounds.js";
import reviewRoutes from "./routes/reviews.js";

import User from "./models/user.js";

import connectDB from "./db/connect.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// mongoose.connect("mongodb://localhost:27017/yelp-camp", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
// });

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", () => {
//   console.log("Database connected!");
// });

const app = express();

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

const sessionConfig = {
  secret: "actualsecret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.use(session(sessionConfig)); // must be before passport.session()
app.use(flash());

// In Express-based app, passport.initialize() middleware is required to initialize
// Passport. If your app uses persistent login sessions, passport.session()
// middleware must also be used
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// will have access in all templates automatically and won't have to pass through
// by putting this before route handlers
app.use((req, res, next) => {
  // console.log(req.session);
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.get("/", (req, res) => {
  res.render("home");
});

app.use("/", userRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/reviews", reviewRoutes);

app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Something went wrong";
  res.status(statusCode).render("error", { err });
  res.send("Something went wrong");
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
