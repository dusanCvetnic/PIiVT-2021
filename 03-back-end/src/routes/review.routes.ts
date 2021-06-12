import { Router } from "express";
import { reviewSchema } from "../schemas/review.chema"
import { validateRequest } from '../middlewares/validateRequest';
import { createReview, deleteReviewById, getAllReviews, getReviewById, updateReviewById } from "../controllers/review.controller";

const router = Router()

router.route('/')
      .get(getAllReviews)
      .post(reviewSchema, validateRequest, createReview)

router.route('/:id')
      .get(getReviewById)
      .put(reviewSchema, validateRequest, updateReviewById)
      .delete(deleteReviewById)

export default router;  