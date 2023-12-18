import { Router } from "express";
import { upload } from "../config/multer.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validatorMiddleware.js";
import { createOfficeSchema } from "../schemas/officeSchema.js";
import { getOffices, getMyOffices, getOffice, createOffice, updateOffice, deleteOffice } from "../controllers/officesController.js";

const router = Router();

router.get('/offices/getoffices', authRequired, getOffices);

router.get('/offices/getmyoffices', authRequired, getMyOffices);

router.get('/office/getoffice/:id', authRequired, getOffice);

router.post('/office/createoffice', authRequired, upload.fields([{name:'image', maxCount: 1}]), validateSchema(createOfficeSchema), createOffice);

router.put('/office/updateoffice/:id', authRequired, upload.fields([{name:'image', maxCount: 1}]), updateOffice);

router.delete('/office/deleteoffice/:id', authRequired, deleteOffice);

export default router;