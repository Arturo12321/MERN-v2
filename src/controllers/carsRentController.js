import CarRent from "../models/carRentModel.js";
import { uploadCarRentFile } from "../libs/uploadCarRentFile.js";

/**
 * Obtiene la lista de autos de alquiler con la información completa del usuario asociado.
 * @param {Object} req - Objeto de solicitud (request).
 * @param {Object} res - Objeto de respuesta (response).
 */

export const getCars = async(req, res) => {
    try {
        const carsRent = await CarRent.find().populate('user').exec();
        res.json(carsRent);
    } catch (error) {
        console.error(error);
        res.status(500).json({error : "Error getting cars from carRent"});
    }
};

export const getMyCars = async(req, res) => {

};

export const getCar = async(req, res) => {

};

export const createCar = async(req, res) => {

};

export const updateCar = async(req, res) => {

};

export const deleteCar = async(req, res) => {

};