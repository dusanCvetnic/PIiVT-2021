import { Router } from "express";
import { createCity, getAllCities, getCityById } from "../controllers/city.controller"; 

const router = Router()

router.route('/')
      .get(getAllCities)
      .post(createCity);

router.route('/:id')
      .get(getCityById)
      .delete()
      .put();

export default router;  