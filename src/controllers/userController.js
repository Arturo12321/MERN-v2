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

        const token = await createdAccessToken({ id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            role: userSaved.role });

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

        const token = await createdAccessToken({ id: userFound._id, email: userFound.email, user: userFound.username,role: userFound.role});

        res.cookie('token', token);

        res.json({
            id: userFound._id, 
            username: userFound.username, 
            email: userFound.email,
            role: userFound.role,
            createdAt: userFound.createdAt.toLocaleString(),
            updatedAt: userFound.updatedAt.toLocaleString(),
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error en el servidor' });
    }
};

export const logout = (req, res) => {
    res.cookie('token', "", {
        expires: new Date(0)
    });
    return res.sendStatus(200);
};

export const getUsers = (req, res) => {
    res.json({ message: 'Acceso permitido para administradores.' });
};

export const profile = async (req, res) => {

    const userFound = await User.findById(req.user.id);

    if (!userFound) return res.status(400).json({ message: " Username not found"});
    
    res.json({
        id: userFound.id,
        username: userFound.username,
        firstname: userFound.firstname,
        lastname: userFound.lastname,
        dni: userFound.dni, 
        birth_date: userFound.birth_date, 
        company_name: userFound.company_name, 
        ruc: userFound.ruc,
        email: userFound.email,
        address: userFound.address,
        cell_phone: userFound.cell_phone,
        role: userFound.role,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,
    });
};

export const updateProfile = (req, res) => {};

export const deleteUser = (req, res) => {};

