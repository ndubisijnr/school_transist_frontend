export type CompletePasswordResetRequest = {
    otp: string,
    customerEmail: string,
    customerPassword: string,
}
export const CompletePasswordResetRequestInit: CompletePasswordResetRequest = {
    otp: "",
    customerEmail: "",
    customerPassword: "",
}