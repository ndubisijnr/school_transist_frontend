import {object, ref, string} from "yup";

export const InitiateForgotPasswordValidation = object({
    customerEmail: string().email('Invalid email format')
        .required('Email is required'),
})