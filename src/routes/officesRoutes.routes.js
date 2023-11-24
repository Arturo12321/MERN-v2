import { Router } from "express";
import { authRequired } from "../middlewares/validateToken";

const router = Router();

router.get('/offices/getoffices', authRequired, getOffices);

router.get('/myoffices/getmyoffices', authRequired, getMyOffices);

router.get('/office/getoffice/:id', authRequired, getOffice);

router.post('/office/createoffice', authRequired, createOffice);

router.put('/office/updateoffice/:id', authRequired, updateOffice);

router.delete('/office/deleteoffice/:id', authRequired, deleteOffice);

export default router;