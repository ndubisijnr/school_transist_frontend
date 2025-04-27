export type CompleteEnrollmentRequest = {
    otp: string,
    customerEmail: string
}
export const CompleteEnrollmentRequestInit: CompleteEnrollmentRequest = {
    otp: "",
    customerEmail: ""
}