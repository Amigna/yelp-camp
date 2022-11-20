import express from "express";
import catchAsync from "../utils/catchAsync.js";
import passport from "passport";
import {
  showRegister,
  register,
  showLogin,
  logoutUser,
  loginUser,
} from "../controllers/users.js";
const router = express.Router();

router.route("/register").get(showRegister).post(catchAsync(register));

router
  .route("/login")
  .get(showLogin)
  .post(
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    loginUser
  );

router.get("/logout", logoutUser);

export default router;
