import express, { json } from "express";
import morgan from "morgan";
import userRoutes from "../routes/userRoutes.js";
import cookieParser from "cookie-parser";
const app = express();

app.use(morgan('dev')); '--Para que aparezcan mensajes de metodos http en la consola'
app.use(express.json())
app.use(cookieParser());
app.use('/api', userRoutes);



export default app;
