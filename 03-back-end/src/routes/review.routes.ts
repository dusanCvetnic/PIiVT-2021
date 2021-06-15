import { Router } from "express";
import { reviewSchema } from "../schemas/review.chema"
import { validateRequest } from '../middlewares/validateRequest';
import { createReview, deleteReviewById, getAllReviews, getReviewById, getReviewByRatedUserIdAndUserWhoRatedId, updateReviewById, updateReviewByRatedUserIdAndUserWhoRatedId } from "../controllers/review.controller";

const router = Router()

router.route('/')
    .get(getAllReviews)

router.route('/:uwrid/rated/:ruid')
    .get(getReviewByRatedUserIdAndUserWhoRatedId)

router.route('/rating/:uwrid/rated/:ruid')
    .post(reviewSchema, validateRequest, createReview)

// OVU RUTU TREBA KORISTITI ZA KREIRANJE ILI UPDATE OCENA!!!
router.route('/create/:uwrid/rated/:ruid/with/:rate')
    .post(updateReviewByRatedUserIdAndUserWhoRatedId)

router.route('/:id')
    .get(getReviewById)
    .put(reviewSchema, validateRequest, updateReviewById)
    .delete(deleteReviewById)

export default router;  