/* rutas */
import { Router } from "express";
import { upload } from "../config/multer.js";
import { authRequired} from "../middlewares/validateToken.js";
import { checkUserRole } from "../middlewares/checkUserRole.js";
import { validateSchema } from "../middlewares/validatorMiddleware.js";
import { registerSchema, loginSchema } from "../schemas/userSchema.js";
import { login, logout, register, profile, myprofile, getUsers, updateProfile, deleteUser, verifyToken } from "../controllers/userController.js";

const router = Router();

router.post('/register', upload.fields([{ name: 'image', maxCount: 1 }]), validateSchema(registerSchema),  register);

router.post('/login', validateSchema(loginSchema), login);

router.post('/logout', logout);

router.get('/users',authRequired, checkUserRole, getUsers); 

router.get('/profile/:id',authRequired,profile);

router.get('/myprofile',authRequired,myprofile);

router.put('/profile/:id',authRequired,upload.fields([{ name: 'image', maxCount: 1 }]), updateProfile);

router.delete('/user/:id',authRequired,checkUserRole, deleteUser);

router.get('/verify', verifyToken);

export default router;

