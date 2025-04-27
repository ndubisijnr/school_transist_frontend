import { useNavigation, RouteProp } from '@react-navigation/native';

// Generic hook to get route params
export const useGetParams = <T extends object>(): T | undefined => {
    const navigation = useNavigation();
    const route = navigation.getState()?.routes[navigation.getState()!.index];

    // Accessing route params and asserting the correct type
    const params = route?.params as T;

    return params;
};
