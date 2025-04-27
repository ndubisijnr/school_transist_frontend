import {useState, useEffect, useCallback, useRef} from "react"
import {RootState, useAppSelector} from "@/store";
import {Platform} from "react-native";
import * as Application from "expo-application";
import {v4 as uuidv4} from "uuid";
import cart from "@/store/modules/cart";
import {useDispatch, useSelector} from "react-redux";
import {ViewCartRequest} from "@/model/request/cart/CartRequest";


const useCart = () => {
    const {cartData} = useSelector((state:RootState ) => state.cart)
    const [cartCount, setCartCount] = useState<number>(0)
    const [cartLength, setCartLength] = useState<number>(0)
    const authState = useSelector((state: RootState) => state.auth);
    const viewCartRequest = useRef(ViewCartRequest);
    const dispatch = useDispatch();
    const user = authState.userDetails?.userId;

    // Get device ID - memoized to prevent recreation
    const getDeviceId = useCallback(async () => {
        try {
            return authState.deviceId ??
                (Platform.OS === "ios" ?
                    await Application.getIosIdForVendorAsync() :
                    Application.getAndroidId()) ??
                uuidv4();
        } catch (error) {
            console.error('Error getting device ID:', error);
            return uuidv4(); // Fallback
        }
    }, [authState.deviceId]);

    // Fetch cart data - memoized callback
    const fetchCartData = useCallback(async () => {
        try {
            const deviceId = await getDeviceId();
            viewCartRequest.current.deviceId = deviceId;
            viewCartRequest.current.customerId = user ? user : undefined
            dispatch(cart.action.viewCart(viewCartRequest.current));
        } catch (error) {
            console.error('Error fetching cart data:', error);
        }
    }, [dispatch, getDeviceId, user]);

    // Update cart counts when cartData changes
    useEffect(() => {
        const itemsCount = Array.isArray(cartData)
            ? cartData.map(it => it?.storefrontShoppingCartItems) || []
            : [];
        setCartCount(itemsCount.length)

    }, [cartData]);

    // Initial data fetch
    useEffect(() => {
        fetchCartData();
    }, [fetchCartData]);

    return {
        cartCount,
        cartLength,
        cartData,
        fetchCartData
    };
};

export default useCart;