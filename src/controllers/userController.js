/* controlador */

import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { uploadFile } from "../libs/uploadFile.js";


export const register = async  (req, res) => {
    try {
        const { username, firstname, lastname, dni, birth_date, company_name, ruc, email, address, cell_phone, password, role } = req.body;
        const image = req.files.image;

        if (!image || image.length === 0) {
            return res.status(400).json({ message: 'Debes enviar una imagen' });
        }

        if (!password) {
            return res.status(400).json({ message: 'Debes proporcionar una contraseña' });
        }

        const { downloadURL } = await uploadFile(image[0]);

        const  passwordHash = await bcrypt.hash(password, 10)

        const newUser = new User({
            username,
            firstname,
            lastname,
            dni,
            birth_date,
            company_name,
            ruc,
            email,
            address,
            cell_phone,
            password: passwordHash,
            image: downloadURL,
            role
    });

     const userSaved = await newUser.save();

    return res.status(200).json({
        id: userSaved._id, 
        username: userSaved.username, 
        email: userSaved.email
    });
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

