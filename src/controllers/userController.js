import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { uploadUserFile } from "../libs/uploadUserFile.js";
import { TOKEN_SECRET } from "../config/config-secret.js";
import { createdAccessToken } from "../libs/jsonWebToken.js";

export const register = async  (req, res) => {
    try {
        const { username, firstname, lastname, dni, birth_date, company_name, ruc, email, address, cell_phone, password, role } = req.body;
        const image = req.files.image;

        const userFound = await User.findOne({
            $or:[
                {username},
                {dni},
                {company_name},
                {ruc},
                {email},
                {cell_phone}
            ]
        });

        if (userFound) {
            if (userFound.username === username) {
                return res.status(400).json(["The username is already in use"]);
            }
            if (userFound.dni === dni) {
                return res.status(400).json(["The DNI is already in use"]);
            }
            if (userFound.company_name === company_name) {
                return res.status(400).json(["The company name is already in use"]);
            }
            if (userFound.ruc === ruc) {
                return res.status(400).json(["The RUC is already in use"]);
            }
            if (userFound.email === email) {
                return res.status(400).json(["The email is already in use"]);
            }
            if (userFound.cell_phone === cell_phone) {
                return res.status(400).json(["The cell phone number is already in use"]);
            }
        }
        
        if (!image || image.length === 0) {
            return res.status(400).json({ message: 'You must send an image' });
        }

        if (!password) {
            return res.status(400).json({ message: 'Debes proporcionar una contraseña' });
        }

        const { downloadURL } = await uploadUserFile(image[0]);

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
            return res.status(400).json(["Email our Username not found"] );
        }

        const isMatch = await bcrypt.compare(password, userFound.password);
        
        if (!isMatch) return res.status(400).json(["Invalid password"]);

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
export const getUsers = async (req, res) => {
    
    try {
        const usersFound = await User.find().lean().exec()
        res.json(usersFound);
        
    } catch (error) {
        res.status(500).json({ error: "No se pudieron obtener los usuarios, disculpa." });
    }
};
export const profile = async (req, res) => {

    const userFound = await User.findById(req.params.id).exec();;

    if (!userFound) return res.status(400).json({ message: " Username not found"});
    console.log(userFound)
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
        // password: userFound.password,
        image: userFound.image,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,
    });
};


export const myprofile = async (req, res) => {

    const userFound = await User.findById(req.user.id);

    if (!userFound) return res.status(400).json({ message: " Username not found"});
    console.log(userFound)
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
        // password: userFound.password,
        image: userFound.image,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,
    });
};
export const updateProfile = async (req, res) => {
    try {
        const userId = req.params.id; 
        const updatedData = req.body;

        if (req.files && req.files.image) {
            const { downloadURL } = await uploadUserFile(req.files.image[0]);
            updatedData.image = downloadURL;
        }

        const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        return res.status(200).json(updatedUser);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error en el servidor' });
    }
};
export const deleteUser = async (req, res) => {

    try {
        const userId = req.params.id;

        const deletedUser = await User.findOneAndDelete({ _id: userId });

        if (!deletedUser) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        return res.status(200).json({ message: 'Usuario eliminado con éxito' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error en el servidor, deleteUser' });
    }
};


export const verifyToken = async(req, res) => {
    const {token} = req.cookies

    if (!token) return res.status(401).json({ message: "Unauthorized "});

    jwt.verify(token, TOKEN_SECRET, async (err, user) => {

        if (err) return res.status(401).json({ message: "Unauthorized "});
        
        const userFound = await User.findById(user.id)
        if (!userFound) return res.status(401).json({ message: "Unauthorized "});
        
        return res.json({
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
            image: userFound.image,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
        });
    });
};