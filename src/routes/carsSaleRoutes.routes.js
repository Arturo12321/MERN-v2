import { Router } from "express";
import { upload } from "../config/multer.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validatorMiddleware.js";
import { createCarSchema } from "../schemas/carSchema.js";
import { getCars, getMyCars, getCar, createCar, updateCar, deleteCar} from "../controllers/carsSaleController.js";

const router = Router();

router.get('/cars/sale/getcars', authRequired, getCars);

router.get('/mycars/sale/getmycars', authRequired, getMyCars);

router.get('/car/sale/getcar/:id', authRequired, getCar);

router.post('/car/sale/createCar', authRequired, upload.fields([{name:'image', maxCount: 1}]), validateSchema(createCarSchema), createCar);

router.put('/car/sale/updatecar/:id', authRequired, upload.fields([{name:'image', maxCount: 1}]), updateCar);

router.delete('/car/sale/deleteCar/:id', authRequired, deleteCar);

export default router;