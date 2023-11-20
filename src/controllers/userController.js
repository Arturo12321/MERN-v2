/* controlador */

import User from "../models/userModel.js";
import { uploadFile } from "../libs/uploadFile.js";


export const register = async  (req, res) => {
    try {
        const body = req.body;
        const image = req.files.image;

        if (!image || image.length === 0) {
            return res.status(400).json({ message: 'Debes enviar una imagen' });
        }
        const { downloadURL } = await uploadFile(image[0]);

        const newUser = await new User({
        username: body.username,
        firstname: body.firstname,
        lastname: body.lastname,
        dni: body.dni,
        birth_date: body.birth_date,
        company_name: body.company_name,
        ruc: body.ruc,
        email: body.email,
        address: body.address,
        cell_phone: body.cell_phone,
        password:body.password,
        image: downloadURL,
        role: body.role
    }).save();

    return res.status(200).json(newUser);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error en el servidor' });
    }
};

export const login = (req, res) => {};

export const getUsers = (req, res) => {};

export const getProfile = (req, res) => {};

export const updateProfile = (req, res) => {};

export const deleteUser = (req, res) => {};

