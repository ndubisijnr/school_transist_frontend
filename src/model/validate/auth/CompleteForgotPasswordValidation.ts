import {object, ref, string} from "yup";

export const CompleteForgotPasswordValidation = object({
    customerPassword: string()
        .min(6, 'Password must be at least 7 characters')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[0-9]/, 'Password must contain at least one number')
        .matches(/[\W_]/, 'Password must contain at least one special character')
        .required("Password Is Required."),
    customerConfirmationPassword: string()
        .equals([ref("customerPassword"), null], "Confirm Password Does Not Match")
        .required("Confirm Password Is Required."),
})