import { Router } from "express";
import { offerSchema } from "../schemas/offer.schema";
import { validateRequest } from '../middlewares/validateRequest';
import AuthMiddleware from "../middlewares/auth.middleware";
import { createOffer, deleteOfferById, getAllOffers, getOfferById, updateOfferById } from "../controllers/offer.controler";

const router = Router()

router.route('/')
      .get(AuthMiddleware.getVerifier('professor'), getAllOffers)
      .post(AuthMiddleware.getVerifier('professor'), offerSchema, validateRequest, createOffer)

router.route('/:id')
      .get(AuthMiddleware.getVerifier('professor'), getOfferById)
      .put(AuthMiddleware.getVerifier('professor'), offerSchema, validateRequest, updateOfferById)
      .delete(AuthMiddleware.getVerifier('professor'), deleteOfferById)

export default router;  