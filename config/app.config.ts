type AppConfigType = {
    baseAccountUrlDev: string | undefined | any;
    baseUrlProd: string  | undefined | any;
    baseBusinessUrlDev: string  | undefined | any;
}
export const appConfig:AppConfigType = {
    baseAccountUrlDev: process.env.EXPO_PUBLIC_BASE_ACCOUNT_URL_DEV,
    baseBusinessUrlDev: process.env.EXPO_PUBLIC_BASE_BUSINESS_URL_DEV,
    baseUrlProd: process.env.EXPO_PUBLIC_BASE_URL_PROD,
}