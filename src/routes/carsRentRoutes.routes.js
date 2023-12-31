import { Router } from "express";
import { upload } from "../config/multer.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validatorMiddleware.js";
import { createCarSchema } from "../schemas/carSchema.js";
import { getCars, getMyCars, getCar, createCar, updateCar, deleteCar} from "../controllers/carsRentController.js";
import { generatePDF } from "../controllers/pdfController.js";

const router = Router();

router.get('/cars/rent/getcars', authRequired, getCars);

router.get('/mycars/rent/getmycars', authRequired, getMyCars);

router.get('/car/rent/getcar/:id', authRequired, getCar);

router.post('/car/rent/createcar', authRequired, upload.fields([{name:'image', maxCount: 1}]), validateSchema(createCarSchema) , createCar);

router.put('/car/rent/updatecar/:id', authRequired, upload.fields([{name: 'image', maxCount: 1}]), updateCar);

router.delete('/cars/rent/deletecar/:id', authRequired, deleteCar);

router.get('/car/rent/generate-pdf', authRequired, generatePDF);

export default router;