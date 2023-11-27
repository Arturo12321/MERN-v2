import { z } from "zod";

export const createCarSchema = z.object({
    brand: z.string({
        required_error: "Brand is required"
    })
    .min(2, {
        message: "Brand must be at least 2 characters"
    })
    .max(50, {
        message: "Brand must be at most 50 characters"
    }),

    model: z.string({
        required_error: "Model is required"
    })
    .min(2, {
        message: "Model must be at least 2 characters"
    })
    .max(50, {
        message: "Model must be at most 50 characters"
    }),

    license_plate_number: z.string({
        required_error: "License Plate is required"
    })
    .min(2, {
        message: "License Plate must be at least 2 characters"
    })
    .max(50, {
        message: "License Plate must be at most 50 characters"
    }),

    color: z.string({
        required_error: "Color is required"
    }),

    price: z.string({
        required_error: "Price is required"
    }),
    

    description: z.string({
        required_error: "Description is required"
    }),

    transmission: z.string({
        required_error: "Transmission is required"
    }),

    fuel: z.string({
        required_error: "Fuel is required"
    }),

    seats: z.string({
        required_error: "Seats is required"
    }),

    engine: z.string({
        required_error: "Engine is required"
    }),

    mileage: z.string({
        required_error: "Mileage is required"
    })
});