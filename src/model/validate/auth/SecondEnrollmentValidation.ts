import {object, ref, string} from "yup";
import {ListOfRegex} from "@/src/model/validate/ListOfRegex";

export const SecondEnrollmentValidation = object({
    customerLastName: string()
        .required('Surname is required')
        .matches(/^[^0-9]*$/, 'Numbers are not allowed')
        .matches(ListOfRegex.spacialCharacter, "Special characters are not allowed"),
    customerFirstName: string()
        .required("Firstname is required.")
        .matches(/^[^0-9]*$/, 'Numbers are not allowed')
        .matches(ListOfRegex.spacialCharacter, "Special characters are not allowed"),
    customerPhoneNumber: string()
        .required('Phone number is required')
        .matches(ListOfRegex.spacialCharacter, "Special characters are not allowed")
        .min(10, "Invalid Phone Number")
        .max(11, "Invalid Phone Number"),
})