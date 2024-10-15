import { checkSchema } from "express-validator";

const registrationSchema = checkSchema( {
    username: {
        notEmpty: {
            errorMessage: 'Username is required',
        },
        isLength: {
            options: { min: 3, max: 20 },
            errorMessage: 'Username must be between 3 and 20 characters',
        },
        trim: true,
        toLowerCase: true,
    },
    email: {
        notEmpty: {
            errorMessage: 'Email is required',
        },
        isEmail: {
            errorMessage: 'Email address is invalid',
        },
        normalizeEmail: true,
    },
    password: {
        notEmpty: {
            errorMessage: 'Password is required',
        },
        isLength: {
            options: { min: 6 },
            errorMessage: 'Password must be at least 6 characters long',
        },
    },
} );

export
{
    registrationSchema,
}
