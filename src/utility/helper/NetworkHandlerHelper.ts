import { AxiosError } from 'axios';

interface ErrorResponse {
    status: number;
    statusText: string;
    headers: Record<string, string>;
    config: Record<string, unknown>;
    request: Record<string, unknown>;
    data: {
        responseCode: string;
        responseMessage: string;
    };
}

export const NetworkHandlerHelper = {
    handle: (error: AxiosError | unknown): ErrorResponse => {
        // Type guard for AxiosError
        const isAxiosError = (error: unknown): error is AxiosError => {
            return (error as AxiosError)?.isAxiosError === true;
        };

        if (isAxiosError(error)) {
            // Check for CORS error first
            if (error.message?.includes('Network Error') && error.request) {
                const isCorsError = !error.response && error.request.status === 0;

                if (isCorsError) {
                    return {
                        status: 403,
                        statusText: 'Forbidden',
                        headers: {},
                        config: {},
                        request: {},
                        data: {
                            responseCode: "CORSError",
                            responseMessage: "Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource"
                        }
                    };
                }
            }

            // Comprehensive network error mapping
            switch (error.code) {
                case "ERR_NETWORK":
                    return {
                        status: 503,
                        statusText: 'Service unavailable',
                        headers: {},
                        config: {},
                        request: {},
                        data: {
                            responseCode: "NetworkError",
                            responseMessage: "Network Error, please check your connection"
                        }
                    };

                case "ECONNABORTED":
                    return {
                        status: 408,
                        statusText: 'Request Timeout',
                        headers: {},
                        config: {},
                        request: {},
                        data: {
                            responseCode: "RequestTimeoutError",
                            responseMessage: "Request timed out, please try again later"
                        }
                    };

                case "ERR_FAILED":
                    return {
                        status: 500,
                        statusText: 'Internal Server Error',
                        headers: {},
                        config: {},
                        request: {},
                        data: {
                            responseCode: "RequestFailedError",
                            responseMessage: "Request failed, please try again"
                        }
                    };

                case "ERR_CANCELED":
                    return {
                        status: 499,
                        statusText: 'Client Closed Request',
                        headers: {},
                        config: {},
                        request: {},
                        data: {
                            responseCode: "RequestCanceledError",
                            responseMessage: "Request was canceled"
                        }
                    };

                case "ETIMEDOUT":
                    return {
                        status: 504,
                        statusText: 'Gateway Timeout',
                        headers: {},
                        config: {},
                        request: {},
                        data: {
                            responseCode: "ConnectionTimeoutError",
                            responseMessage: "Connection timed out, please check your network"
                        }
                    };

                case "ERR_NAME_NOT_RESOLVED":
                    return {
                        status: 500,
                        statusText: 'Internal Server Error',
                        headers: {},
                        config: {},
                        request: {},
                        data: {
                            responseCode: "DNSResolutionError",
                            responseMessage: "Unable to resolve server address"
                        }
                    };

                case "ERR_CERT_AUTHORITY_INVALID":
                    return {
                        status: 495,
                        statusText: 'SSL Certificate Error',
                        headers: {},
                        config: {},
                        request: {},
                        data: {
                            responseCode: "SSLCertificateError",
                            responseMessage: "Invalid SSL certificate"
                        }
                    };

                default:
                    return {
                        status: 500,
                        statusText: 'Internal Server Error',
                        headers: {},
                        config: {},
                        request: {},
                        data: {
                            responseCode: "UnknownError",
                            responseMessage: "An unexpected error occurred"
                        }
                    };
            }
        }

        // Handle non-Axios errors
        return {
            status: 500,
            statusText: 'Internal Server Error',
            headers: {},
            config: {},
            request: {},
            data: {
                responseCode: "UnknownError",
                responseMessage: "An unexpected error occurred"
            }
        };
    },

    createCustomError: (
        responseCode: string,
        responseMessage: string,
        status: number = 500
    ): ErrorResponse => ({
        status,
        statusText: 'Service Error',
        headers: {},
        config: {},
        request: {},
        data: {
            responseCode,
            responseMessage
        }
    })
};