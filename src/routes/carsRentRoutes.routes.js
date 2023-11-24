import { Router } from "express";
import { authRequired } from "../middlewares/validateToken";

const router = Router();

router.get('/cars/rent/getcars', authRequired, getCars);

router.get('/mycars/rent/getmycars', authRequired, getMyCars);

router.get('/car/rent/getcar/:id', authRequired, getCar);

router.post('/car/rent/createcar', authRequired, createCar);

router.put('/car/rent/updatecar/:id', authRequired, updateCar);

router.delete('/cars/rent/deletecar/:id', authRequired, deleteCar);

export default router;