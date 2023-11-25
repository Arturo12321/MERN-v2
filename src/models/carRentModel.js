import mongoose from "mongoose";

const carRentSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: Date,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    license_plate_number: {
        type: String,
        unique: true,
        required: true
    },
    color: {
        type: String,
        enum: ['rojo', 'azul', 'verde', 'negro', 'blanco', 'otros'],
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    transmission: {
        type: String,
        enum: ['automático', 'manual'],
        required: true
    },
    fuel: {
        type: String,
        enum: ['gasolina', 'diésel', 'eléctrico', 'híbrido'],
        required: true
    },
    seats: {
        type: Number,
        min: 1,
        required: true
    },
    engine: {
        type: String,
        required: true
    },
    mileage: {
        type: Number,
        min: 0,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.model('CarRent', carRentSchema);