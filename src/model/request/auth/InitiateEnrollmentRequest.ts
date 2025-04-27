export type InitiateEnrollmentRequest = {
    customerEmail: string,
    customerFirstName: string,
    customerLastName: string,
    customerPassword: string,
    customerPhoneNumber: string,
    customerRoleId: number,
    customerState: string,
    customerStatus: string,
    customerTitle: string
}
export const InitiateEnrollmentRequestInit: InitiateEnrollmentRequest = {
    customerEmail: "",
    customerFirstName: "",
    customerLastName: "",
    customerPassword: "",
    customerPhoneNumber: "",
    customerRoleId: 0,
    customerState: "",
    customerStatus: "",
    customerTitle: ""
}