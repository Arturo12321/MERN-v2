import { z } from "zod";

export const createOfficeSchema = z.object({
    name: z.string({
        required_error: "Name is required"
    })
    .min(2, {
        message: "Name must be at least 2 characters"
    })
    .max(50, {
        message: "Name must be at most 50 characters"
    }),

    address: z.string({
        required_error: "Address is required"
    })
    .min(2, {
        message: "Address must be at least 2 characters"
    })
    .max(50, {
        message: "Address must be at most 50 characters"
    }),

    city: z.string({
        required_error: "City is required"
    })
    .min(2, {
        message: "City must be at least 2 characters"
    })
    .max(50, {
        message: "City must be at most 50 characters"
    }),

    country: z.string({
        required_error: "Country is required"
    }),

    phone: z.number({
        required_error: "Price is required"
    }),

    email: z.string({
        required_error: "Email name is required"
    })
    .email({
        message: "Email is Invalid"
    }),

    latitude: z.number({
        required_error: "Latitude is required"
    }),

    longitude: z.number({
        required_error: "Longitude is required"
    })
});