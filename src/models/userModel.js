/* Este es mi modelo*/
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        trim: true
    },
    firstname: {
        type: String,
        require: true,
        trim: true
    },
    lastname: {
        type: String,
        require: true,
        trim: true
    },
    dni: {
        type: Number,
        require: true,
        trim: true,
        unique: true
    },
    birth_date: {
        type: Date,
        require: true,
        trim: true
    },
    company_name: {
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    ruc: {
        type: Number,
        require: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    address: {
        type: String,
        require: true,
        trim: true
    },
    cell_phone: {
        type: Number,
        require: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
    },
    image: { 
        type: String,
        require: true
    },
    role: { 
        type: String, 
        enum: ['user', 'admin'], 
        default: 'user' }
},{
    timestamps: true
});

export default mongoose.model('User', userSchema);
