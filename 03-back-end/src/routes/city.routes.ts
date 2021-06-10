import { Router } from "express";
import { createCity, deleteCityById, getAllCities, getCityById, updateCityById } from "../controllers/city.controller"; 

const router = Router()

router.route('/')
      .get(getAllCities)
      .post(createCity)

router.route('/:id')
      .get(getCityById)
      .put(updateCityById)
      .delete(deleteCityById)

export default router;  