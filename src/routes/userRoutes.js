/* rutas */
import { Router } from "express";
import { login , register, getProfile, getUsers, updateProfile, deleteUser } from "../controllers/userController.js";
import { upload } from "../config/multer.js";

const router = Router()

router.post('/register', upload.fields([{ name: 'image', maxCount: 1 }]) ,register);

router.post('/login', login)

router.get('/users', getUsers)

router.get('/profile/:id',getProfile)

router.put('/profile/:id', updateProfile)

router.delete('/user/:id', deleteUser)

export default router;

