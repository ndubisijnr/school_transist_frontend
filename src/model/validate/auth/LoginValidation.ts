import {object, string} from "yup";

export const LoginValidation = object({
    customerEmail: string().email('Invalid email format')
        .required('Email is required'),
    customerPassword: string().required('Password is required')
})