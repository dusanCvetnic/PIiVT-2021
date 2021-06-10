import { Router } from "express";
import { createCity, deleteCityById, getAllCities, getCityById, updateCityById } from "../controllers/city.controller"; 
import { citySchema } from "../schemas/city.schema";
import { validateRequest } from '../middlewares/validateRequest';

const router = Router()

router.route('/')
      .get(getAllCities)
      .post(citySchema, validateRequest, createCity)

router.route('/:id')
      .get(getCityById)
      .put(citySchema, validateRequest, updateCityById)
      .delete(deleteCityById)

export default router;  