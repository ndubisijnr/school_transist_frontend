declare global {
    namespace NodeJS {
        interface ProcessEnv {
            EXPO_PUBLIC_APP_ENV: 'Dev' | 'Prod';
            EXPO_PUBLIC_BASE_URL_DEV: string;
            EXPO_PUBLIC_BASE_URL_PROD: string;
        }
    }
}

export {}