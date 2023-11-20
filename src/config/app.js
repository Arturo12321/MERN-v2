import express, { json } from "express";
import morgan from "morgan";
import userRoutes from "../routes/userRoutes.js";

const app = express();

app.use(morgan('dev')); '--Para que aparezcan mensajes de metodos http en la consola'
app.use(express.json())
app.use('/api', userRoutes);



export default app;
