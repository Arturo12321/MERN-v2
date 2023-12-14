import CarSale from "../models/carSaleModel.js";
import { uploadCarSaleFile } from "../libs/uploadCarSaleFile.js";


export const getCars = async(req, res) => {
    try {
        const carsSale = await CarSale.find()
        .populate('user')
        .exec();
        res.json(carsSale);
    }catch(error){
        console.error(error);
        res.status(500).json({error: "Error getting cars from carSale"});
    }
};

export const getMyCars = async(req, res) => {
    try {
        const myCarsSale = await CarSale.find()
        .populate('user')
        .exec();
        res.json(myCarsSale);
    } catch (error) {
        console.error(error);
        res.status(500).json({error:" error getting my cars from  carsSale "})
    }
};

export const getCar = async(req, res) => {
    try {
        const carSale = await CarSale.findById(req.params.id)
        .populate('user')
        .exec();
        res.json(carSale);
    } catch (error) {
        console.error(error);
        res.status(500).json({error:"Error getting car from CarSale"});
    }
};

export const createCar = async(req, res) => {
    try {
        const { brand, model, year, license_plate_number, color, price, description, transmission, fuel, seats, engine, mileage } = req.body;
        const image = req.files.image;

        if (!image || image.length === 0) {
            return res.status(400).json({message: "You must send an image"});
        }

        const { downloadURL } = await uploadCarSaleFile(image[0]);

        const newCarSale = new CarSale({
            brand, 
            model, 
            year,
            image: downloadURL,
            license_plate_number, 
            color, 
            price, 
            description, 
            transmission, 
            fuel, 
            seats, 
            engine,
            mileage,
            user: req.user.id
        });
        const carSaleSaved = await newCarSale.save();
        res.json(carSaleSaved);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error creating car in CarSale" });
    }
};

export const updateCar = async(req, res) => {
    try {
        const carSaleId = req.params.id;
        const updatedData = req.body;

        if (req.files && req.files.image) {
            const { downloadURL } = await uploadCarSaleFile(req.files.image[0]);
            updatedData.image = downloadURL;
        }

        const updatedCarSale = await CarSale.findByIdAndUpdate(carSaleId, updatedData, { new: true });
        
        if (!updatedCarSale) {
            return res.status(404).json({ message: 'CarSale no encontrado' });
        }

        return res.status(200).json(updatedCarSale);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error en el servidor' });
    }
};

export const deleteCar = async(req, res) => {
    try {

        const carId = req.params.id;
        const deletedCarSale = await CarSale.findByIdAndDelete({ _id: carId });

        if (!deletedCarSale) {
            return res.status(404).json({ error: 'El auto no existe' });
        }

        res.json({ message: 'Auto eliminado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Error getting car from CarSale"});
    }
};