import { Router } from "express";
import { userLogin } from "../controllers/auth.controller";
import { validateRequest } from '../middlewares/validateRequest';
import { userLoginSchema } from "../models/user.login.model";

const router = Router()

router.route('/user/login')
      .post(userLoginSchema, validateRequest, userLogin)

export default router;  