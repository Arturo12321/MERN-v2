import { builPDF } from "../libs/pdfKit.js";
import CarRent from "../models/carRentModel.js";

export const generatePDF = async (req, res) => {
    try {

        const carRentData = await CarRent.find({ user: req.user.id });
        const stream = res.writeHead(200, {
            "Content-Type": "application/pdf",
            "Content-Disposition": "attachment; filename=carRent.pdf",
        })


        builPDF(
            (data) =>  stream.write(data), 
            () => stream.end(),
            carRentData
            );
            res.send("invoice")
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al generar el informe PDF');
    }
};
