import { Router } from "express";
import { createCity, deleteCityById, getAllCities, getCityById, updateCityById } from "../controllers/city.controller"; 
import { citySchema } from "../schemas/city.schema";
import { validateRequest } from '../middlewares/validateRequest';
import AuthMiddleware from "../middlewares/auth.middleware";

const router = Router()

router.route('/')
      .get(AuthMiddleware.getVerifier('professor', 'student'), getAllCities)
      .post(citySchema, validateRequest, createCity)

router.route('/:id')
      .get(getCityById)
      .put(citySchema, validateRequest, updateCityById)
      .delete(deleteCityById)

export default router;  