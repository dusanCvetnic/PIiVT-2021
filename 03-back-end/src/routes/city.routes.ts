import { Router } from "express";
import { createCity, deleteCityById, getAllCities, getCityById, updateCityById } from "../controllers/city.controller"; 
import { citySchema } from "../schemas/city.schema";
import { validateRequest/* , validateNumberOfFields */ } from '../middlewares/validateRequest';

const router = Router()

router.route('/')
      .get(getAllCities)
      .post(citySchema, validateRequest, createCity)

router.route('/:id')
      .get(getCityById)
      .put(updateCityById)
      .delete(deleteCityById)

export default router;  