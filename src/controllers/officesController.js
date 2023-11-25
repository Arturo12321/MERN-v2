import Office from "../models/officeModel.js";
import { uploadOfficeFile } from "../libs/uploadOfficeFile.js";

export const getOffices = async(req, res) => {
    try {
        const offices = await Office.find()
        .populate('user')
        .exec();
        res.json(offices);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error getting Office"});
    }
};

export const getMyOffices = async(req, res) => {
    try {
        const myOffices = await Office.find({user: res.user.id})
        .populate('user')
        .exec();
        res.json(myOffices)
    } catch (error) {
        console.error(error);
        res.status(500).json({error : "Error getting myOffices from Offices"});
    }
};

export const getOffice = async(req, res) => {
    try {
        const office = await Office.find(req.params.id)
        .populate('user')
        .exec();
        res.json(office)
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Error getting office from getOffice"});
    }
};

export const createOffice = async(req, res) => {
    try {
        const { name, address, city, country, phone, email,  latitude, longitude } = req.body;
        const image = req.files.image;

        if (!image || image.length === 0) {
            return res.status(400).json({message: "You must send an image"});
        }

        const { downloadURL } = await uploadOfficeFile(image[0]);

        const newOffice = new Office({
            name, 
            address, 
            city, 
            country, 
            phone, 
            email,  
            latitude, 
            longitude,
            image: downloadURL,
            user: req.user.id
        });
        const officeSaved = await newOffice.save();
        res.json(officeSaved);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error creating office in OOffice" });
    }
};

export const updateOffice = async(req, res) => {
    try {
        const officeId = req.params.id;
        const updatedData = req.body;

        if (req.files && req.files.image) {
            const { downloadURL } = await uploadOfficeFile(req.files.image[0]);
            updatedData.image = downloadURL;
        }

        const updatedOffice = await Office.findByIdAndUpdate(officeId, updatedData, { new: true });
        
        if (!updatedOffice) {
            return res.status(404).json({ message: 'Office no encontrado' });
        }

        return res.status(200).json(updatedOffice);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error en el servidor' }); 
    }
};

export const deleteOffice = async(req, res) => {
    try {
        const officeId = req.params.id;
        const deletedOffice = await Office.findByIdAndDelete({ _id: officeId });

        if (!deletedOffice) {
            return res.status(404).json({ error: 'La office no existe' });
        }

        return res.status(200).json({ message: 'Office eliminado con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Error getting office from Office"});
    }
};
