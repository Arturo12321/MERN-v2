import Office from "../models/officeModel.js";
import { uploadOfficeFile } from "../libs/uploadOfficeFile.js";

export const getOffices = async(req, res) => {
    try {
        const offices = await Office.find().populate('user').exec();
        res.json(offices);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error getting Office"});
    }
};

export const getMyOffices = async(req, res) => {

};

export const getOffice = async(req, res) => {

};

export const createOffice = async(req, res) => {

};

export const updateOffice = async(req, res) => {

};

export const deleteOffice = async(req, res) => {

};
