import CarSale from "../models/carSaleModel.js";
import { uploadCarSaleFile } from "../libs/uploadCarSaleFile.js";


export const getCars = async(req, res) => {
    try {
        const carsSale = await CarSale.find().populate('user').exec();
        res.json(carsSale);
    }catch(error){
        console.error(error);
        res.status(500).json({error: "Error getting cars from carSale"});
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