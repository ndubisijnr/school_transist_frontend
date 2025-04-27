import {RouteProp} from "@react-navigation/native";

export type OtpVerificationType ={
    type: "forgot-password",
}

export type StorefrontType ={
    storefrontId: string,
    storefrontName:string
}

export type DeliveryAddressType ={
    address: any,
}

export type DeliveryMethodType ={
    deliveryMethod: string,
}

export type RedirectFromType ={
    route: string,
}


export type RootStackParamTypeFromRoute = {
    otpVerificationType: OtpVerificationType;
    storefrontType: StorefrontType;
    deliveryAddressType:DeliveryAddressType
    redirectFromType:RedirectFromType
    deliveryMethodType:DeliveryMethodType
};

export type OtpVerificationTypeProps = RouteProp<RootStackParamTypeFromRoute, 'otpVerificationType'>;
export type storefrontTypeProps = RouteProp<RootStackParamTypeFromRoute, 'storefrontType'>;
export type deliveryAddressType = RouteProp<RootStackParamTypeFromRoute, 'deliveryAddressType'>;
export type redirectFromType = RouteProp<RootStackParamTypeFromRoute, 'redirectFromType'>;
export type deliveryMethodType = RouteProp<RootStackParamTypeFromRoute, 'deliveryMethodType'>;




