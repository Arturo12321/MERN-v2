import CarRent from "../models/carRentModel.js";
import { uploadCarRentFile } from "../libs/uploadCarRentFile.js";

export const getCars = async(req, res) => {
    try {
        const carsRent = await CarRent.find()
        .populate('user')
        .exec();
        res.json(carsRent);
    } catch (error) {
        console.error(error);
        res.status(500).json({error : "Error getting cars from carRent"});
    }
};

export const getMyCars = async(req, res) => {
    try {
        const myCarsRent = await CarRent.find({user: req.user.id})
        .populate('user')
        .exec();
        res.json(myCarsRent);
    } catch (error) {
        console.error(error);
        res.status(500).json({error : "Error getting mycars from carRent"});
    }
};

export const getCar = async(req, res) => {
    try {
        const carRent = await CarRent.findById(req.params.id)
        .populate('user')
        .exec();
        res.json(carRent);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Error getting car from CarRent"});
    }
};

export const createCar = async(req, res) => {
    try {
        const { brand, model, year, license_plate_number, color, price, description, transmission, fuel, seats, engine, mileage } = req.body;
        const image = req.files.image;

        if (!image || image.length === 0) {
            return res.status(400).json({message: "You must send an image"});
        }

        const { downloadURL } = await uploadCarRentFile(image[0]);

        const newCarRent = new CarRent({
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
        const carRentSaved = await newCarRent.save();
        res.json(carRentSaved);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error creating car in CarRent" });
    }
};

export const updateCar = async(req, res) => {
    try {
        const carRentId = req.params.id;
        const updatedData = req.body;

        if (req.files && req.files.image) {
            const { downloadURL } = await uploadCarRentFile(req.files.image[0]);
            updatedData.image = downloadURL;
        }

        const updatedCarRent = await CarRent.findByIdAndUpdate(carRentId, updatedData, { new: true });
        
        if (!updatedCarRent) {
            return res.status(404).json({ message: 'CarRent no encontrado' });
        }

        return res.status(200).json(updatedCarRent);
    } catch (error) {   
        console.log(error);
        return res.status(500).json({ message: 'Error en el servidor' }); 
    }
};

export const deleteCar = async(req, res) => {
    try {
        const carId = req.params.id;
        const deletedCarRent = await CarRent.findByIdAndDelete({ _id: carId });

        if (!deletedCarRent) {
            return res.status(404).json({ error: 'El auto no existe' });
        }

        return res.status(200).json({ message: 'Auto eliminado con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Error getting car from CarRent"});
    }
};