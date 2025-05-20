type AppConfigType = {
    baseUrlProd: string  | undefined | any;
    baseUrlDev: string  | undefined | any;
}
export const appConfig:AppConfigType = {
    baseUrlDev: process.env.EXPO_PUBLIC_BASE_URL,
    baseUrlProd: process.env.EXPO_PUBLIC_BASE_URL,
}