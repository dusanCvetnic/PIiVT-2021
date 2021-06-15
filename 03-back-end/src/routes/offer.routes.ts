import { Router } from "express";
import { offerSchema } from "../schemas/offer.schema";
import { validateRequest } from '../middlewares/validateRequest';
import AuthMiddleware from "../middlewares/auth.middleware";

const router = Router()

router.route('/')
      .get(AuthMiddleware.getVerifier('professor', 'student'), )
      .post(offerSchema, validateRequest, )

router.route('/:id')
      .get()
      .put(offerSchema, validateRequest, )
      .delete()

export default router;  