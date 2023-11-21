/* rutas */
import { Router } from "express";
import { login, logout, register, profile, getUsers, updateProfile, deleteUser } from "../controllers/userController.js";
import { upload } from "../config/multer.js";
import { authRequired} from "../middlewares/validateToken.js";
import { checkUserRole } from "../middlewares/checkUserRole.js";
const router = Router()

router.post('/register', upload.fields([{ name: 'image', maxCount: 1 }]) ,register);

router.post('/login', login)

router.post('/logout', logout)

router.get('/profile',authRequired,profile)

router.get('/users',authRequired, checkUserRole, getUsers);

router.put('/profile/:id', updateProfile)

router.delete('/user/:id', deleteUser)

export default router;

