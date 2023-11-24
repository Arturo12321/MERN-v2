import { Router } from "express";
import { authRequired } from "../middlewares/validateToken";

const router = Router();

router.get('/cars/sale/getcars', authRequired, getCars);

router.get('/mycars/sale/getmycars', authRequired, getMyCars);

router.get('/car/sale/getcar/:id', authRequired, getCar);

router.post('/car/sale/createCar', authRequired, createCar);

router.put('/car/sale/updatecar/:id', authRequired, updateCar);

router.delete('/car/sale/deleteCar/:id', authRequired, deleteCar);

export default router;