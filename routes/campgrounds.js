import express from "express";
import catchAsync from "../utils/catchAsync.js";
import { isLoggedIn, validateCampground, isAuthor } from "../middleware.js";
import {
  showAllCampgrounds,
  createCampground,
  showOneCampground,
  showEditCampground,
  editOneCampground,
  deleteOneCampground,
  showNewCampground,
} from "../controllers/campgrounds.js";
const router = express.Router();

router
  .route("/")
  .get(catchAsync(showAllCampgrounds))
  .post(isLoggedIn, validateCampground, catchAsync(createCampground));

router.get("/new", isLoggedIn, showNewCampground);

router
  .route("/:id")
  .get(catchAsync(showOneCampground))
  .put(isLoggedIn, isAuthor, validateCampground, catchAsync(editOneCampground))
  .delete(isLoggedIn, isAuthor, catchAsync(deleteOneCampground));

router.get("/:id/edit", isLoggedIn, isAuthor, catchAsync(showEditCampground));

export default router;
