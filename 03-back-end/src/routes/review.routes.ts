import { Router } from "express";
import { reviewSchema } from "../schemas/review.chema"
import { validateRequest } from '../middlewares/validateRequest';
import { createReview, deleteReviewById, getAllReviews, getReviewById, getReviewByRatedUserIdAndUserWhoRatedId, updateReviewById, updateReviewByRatedUserIdAndUserWhoRatedId } from "../controllers/review.controller";

const router = Router()

router.route('/')
    .get(getAllReviews)

router.route('/:ruid/rated/:uwrid')
    .get(getReviewByRatedUserIdAndUserWhoRatedId)

router.route('/rating/:uwrid/rated/:ruid')
    .post(reviewSchema, validateRequest, createReview)
router.route('/update/:uwrid/rated/:ruid')
    .put(reviewSchema, validateRequest, updateReviewByRatedUserIdAndUserWhoRatedId)
router.route('/:id')
    .get(getReviewById)
    .put(reviewSchema, validateRequest, updateReviewById)
    .delete(deleteReviewById)

export default router;  