import express, { json } from "express";
import morgan from "morgan";
import userRoutes from "../routes/userRoutes.routes.js";
import carsRentRoutes from "../routes/carsRentRoutes.routes.js";
import carsSaleRoutes from "../routes/carsSaleRoutes.routes.js";
import officesRoutes from "../routes/officesRoutes.routes.js";
import cookieParser from "cookie-parser";
const app = express();

app.use(morgan('dev')); '--Para que aparezcan mensajes de metodos http en la consola'
app.use(express.json())
app.use(cookieParser());


app.use('/api', userRoutes);

app.use('/api', carsRentRoutes);

app.use('/api', carsSaleRoutes);

app.use('/api', officesRoutes);



export default app;
