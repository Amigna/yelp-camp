import express from "express";
import catchAsync from "../utils/catchAsync.js";
import { isLoggedIn, validateReview, isReviewAuthor } from "../middleware.js";
import { deleteReview, createReview } from "../controllers/reviews.js";

const router = express.Router({ mergeParams: true });

router.post("/", isLoggedIn, validateReview, catchAsync(createReview));

router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  catchAsync(deleteReview)
);

export default router;
