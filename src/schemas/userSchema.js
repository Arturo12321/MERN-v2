import { z } from "zod";

export const registerSchema = z.object({
    username: z.string({
        required_error: "Username is required"
    })
    .min(3, {
        message: "Username must be at least 3 characters"
    })
    .max(20, {
        message: "Username must be at most 20 characters"
    }),

    firstname: z.string({
        required_error: "Firstname is required"
    })
    .min(3, {
        message: "Firstname must be at least 3 characters"
    })
    .max(20, {
        message: "Firstname must be at most 20 characters"
    }),

    lastname: z.string({
        required_error: "Lastname is required"
    })
    .min(3, {
        message: "Lastname must be at least 3 characters"
    })
    .max(20, {
        message: "Lastname must be at most 20 characters"
    }),

    dni: z.string({
        required_error: "DNI is required"
    }),
    company_name: z.string({
        required_error: "Company name is required"
    })
    .min(3, {
        message: "Company name must be at least 3 characters"
    })
    .max(255, {
        message: "Company name must be at most 255 characters"
    }),

    ruc: z.string({
        required_error: "RUC name is required"
    }),
    email: z.string({
        required_error: "Email name is required"
    })
    .email({
        message: "Email is Invalid"
    }),

    address: z.string({
        required_error: "Address name is required"
    })
    .min(3, {
        message: "Address must be at least 3 characters"
    })
    .max(255, {
        message: "Address must be at most 255 characters"
    }),

    cell_phone: z.string({
        required_error: "Cell phone is required"
    }),
    password: z.string({
        required_error: "Password name is required"
    })
    .min(8, {
        message: "Password must be at least 8 characters"
    }),
});

export const loginSchema = z.object({
    password: z.string({
        required_error: "Password is required",
    }).min(8, {
        message: "Password must be at least 8 characters"
    }),
});