/* controlador */

import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { uploadFile } from "../libs/uploadFile.js";
import { createdAccessToken } from "../libs/jsonWebToken.js";
import { TOKEN_SECRET } from "../config/config-secret.js";

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

        const  passwordHash = await bcrypt.hash(password, 10);

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

        const token = await createdAccessToken({ id: userSaved._id, });

        res.cookie('token', token);

        res.json({
            id: userSaved._id, 
            username: userSaved.username, 
            email: userSaved.email,
            createdAt: userSaved.createdAt.toLocaleString(),
            updatedAt: userSaved.updatedAt.toLocaleString(),
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error en el servidor al querer crear un User' });
    }
};

export const login = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const userFound = await User.findOne({ $or: [{ email }, { username }] });
        
        if (!userFound) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, userFound.password);
        
        if (!isMatch) return res.status(400).json({ message: "Invalid password"});

        const token = await createdAccessToken({ id: userFound._id, });

        res.cookie('token', token);

        res.json({
            id: userFound._id, 
            username: userFound.username, 
            email: userFound.email,
            createdAt: userFound.createdAt.toLocaleString(),
            updatedAt: userFound.updatedAt.toLocaleString(),
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error en el servidor' });
    }
};

export const getUsers = (req, res) => {};

export const getProfile = (req, res) => {};

export const updateProfile = (req, res) => {};

export const deleteUser = (req, res) => {};

