import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    Keyboard,
    TouchableWithoutFeedback,
    ActivityIndicator,
    Platform,
    StatusBar,
    ScrollView
} from 'react-native';
import {Feather, Ionicons} from '@expo/vector-icons';
import {useAppSelector, useAppDispatch} from "@/store";
import {RootState} from "@/store";
import {DefaultTextInput} from "@/component/textInput/DefaultTextInput";
import {useFormik} from "formik";
import {businessLookupRequest, businessLookupRequestType} from "@/model/request/business/BusinessRequest";

import {showMessage} from "@/utility/hook/useToast";
import business from "@/store/modules/business";
import { usePaystack } from 'react-native-paystack-webview';
import {RouterUtil} from "@/utility/RouterUtil";


const Send = () => {
    const [activeTab, setActiveTab] = useState('Send Money');
    const [businessName, setBusinessName] = useState('');
    const [amount, setAmount] = useState('');
    const [remarks, setRemarks] = useState('Payment for nike shoes limited editions 2025');
    const [showTooltip, setShowTooltip] = useState(true);
    const [showPaymentDetails, setShowPaymentDetails] = useState(false)
    const {location} = useAppSelector((state: RootState) => state.auth);
    const {loading, paymentDetails} = useAppSelector((state: RootState) => state.business);
    const [selectedDeliveryArea, setSelectedDeliveryArea] = useState(null);
    const [selectedDeliveryAreaAmount, setSelectedDeliveryAreaAmount] = useState(1700);

    const [lookUpRef, setLookUpRef] = useState(businessLookupRequest);
    const dispatch = useAppDispatch();
    const { popup } = usePaystack();

    // Add state for the checkbox
    const [useCurrentLocation, setUseCurrentLocation] = useState(true);

    // Toggle function for the checkbox
    const toggleUseCurrentLocation = () => {
        setUseCurrentLocation(!useCurrentLocation);
        if(useCurrentLocation){
            setSelectedDeliveryAreaAmount(1700)
            setSelectedDeliveryArea(null)
        }else{
            setSelectedDeliveryAreaAmount(0)
        }
    };

    const payNow = () => {
        if(selectedDeliveryAreaAmount > 0)
            popup.checkout({
            email: 'jane.doe@example.com',
            amount: Number(orderSummary?.subtotal),
            reference: orderSummary?.orderReferenceNumber,
            onSuccess: (res) => {
            },
            onCancel: () => console.log('User cancelled'),
            onLoad: (res) => console.log('WebView Loaded:', res),
            onError: (err) => console.log('WebView Error:', err)
        });
    };

    async function handleSubmit (values: businessLookupRequestType){

        console.log("response==========", values)

        dispatch(business.action.lookup(values)).then((response: any)=> {
            console.log(response.payload)
            if (response.payload.response_code === "00" || response.payload.code === "00"){
                console.log(response.payload.data)
                setShowPaymentDetails(true)
            }else {
                showMessage(response.payload.message || response.payload.response_message)
            }
        })
    }

    const formik = useFormik({
        initialValues: lookUpRef,
        onSubmit: handleSubmit,

    })

    const handleDeliveryAreaSelect = (area: any) => {
        setSelectedDeliveryArea(area);
    };

    const handleTabPress = (tab: any) => {
        setActiveTab(tab);
    };

    const dismissKeyboard = () => {
        Keyboard.dismiss();
        setShowTooltip(false);
    };


    const PaymentDetailsScreen = () => {
        function clearProcess(){
            dispatch(business.mutation.setPaymentDetails(null))
        }

        return (
            <ScrollView style={[styles.content, styles.container]}>
                <View style={[styles.section,{marginBottom:10}]} >
                    <Text style={{fontSize:14}}>DELIVERING TO</Text>
                    <View className="text-end" style={{width:'50%'}}>
                        <TouchableOpacity>
                            <View style={styles.selectorRow}>
                                <Text style={styles.selectorText}>Change Address</Text>
                                <Ionicons name="chevron-forward" size={24} color="#000" />
                            </View>
                            <Text numberOfLines={1} ellipsizeMode="tail" style={{textAlign: 'right',fontSize:14}}>
                                {location?.address}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Add Location Preference Checkbox */}
                <View style={styles.locationPrefContainer}>
                    <TouchableOpacity
                        style={styles.checkboxContainer}
                        onPress={() => toggleUseCurrentLocation()}
                    >
                        <View style={[styles.checkbox, useCurrentLocation ? {} : styles.checkboxChecked]}>
                            {!useCurrentLocation && <Ionicons name="checkmark" size={16} color="#fff" />}
                        </View>
                        <Text style={styles.checkboxLabel}>
                            Do not use my current location to estimate delivery fee
                        </Text>
                    </TouchableOpacity>
                </View>

                {paymentDetails?.map((it, index) => {
                    return <View key={index}>
                        {/* Payment To Section */}
                        <View style={styles.paymentToCard}>
                            <View style={styles.recipientContainer}>
                                <View style={styles.avatarContainer}>
                                    <Text style={styles.avatarText}>{it.business?.name?.substring(0, 2).toUpperCase()}</Text>
                                </View>
                                <Text style={styles.recipientName}>Payment to {it.business?.name}</Text>
                            </View>
                            <View style={styles.protectedBadge}>
                                <Text style={styles.protectedText}>Protected</Text>
                            </View>
                        </View>

                        {/* Delivery Area Section - Only show if "Do not use my location" is checked */}
                        {!useCurrentLocation && (
                            <View style={styles.sectionCard}>
                                <Text style={styles.sectionTitle}>Select Delivery Area</Text>
                                {it?.areas?.map((a, index) => {
                                    return (
                                        <View style={styles.deliveryOptionsContainer} key={index}>
                                            <TouchableOpacity
                                                style={[
                                                    styles.deliveryOption,
                                                    selectedDeliveryArea === a.area && styles.selectedDeliveryOption
                                                ]}
                                                onPress={() => {
                                                    handleDeliveryAreaSelect(a.area),
                                                    setSelectedDeliveryAreaAmount(a.charge)
                                                }}
                                            >
                                                <Text style={styles.deliveryOptionTitle}>{a.area}</Text>
                                                <Text style={styles.deliveryOptionPrice}>{a.charge}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                })}
                            </View>
                        )}

                        {/* Payment Summary Section */}
                        <View style={styles.sectionCard}>
                            <View style={styles.summaryRow}>
                                <Text style={styles.summaryLabel}>Amount</Text>
                                <Text style={styles.summaryValue}>₦{it?.initial_amount}</Text>
                            </View>

                            <View style={styles.summaryRow}>
                                <Text style={styles.summaryLabel}>Protection Fee</Text>
                                <Text style={styles.summaryValue}>₦{it?.protection_fee}</Text>
                            </View>

                            <View style={styles.summaryRow}>
                                <Text style={styles.summaryLabel}>Delivery</Text>
                                <View style={styles.deliveryContainer}>
                                    <Text style={styles.deliveryLocationText}>
                                        {useCurrentLocation ? "(based on your current location)" : "(based on selected area)"}
                                    </Text>
                                    <Text style={styles.summaryValue}>₦{selectedDeliveryAreaAmount}</Text>
                                </View>
                            </View>

                            <View style={styles.divider} />

                            <View style={[styles.summaryRow, styles.totalRow]}>
                                <Text style={styles.totalLabel}>Total</Text>
                                <Text style={styles.totalValue}>₦{Number(it?.protection_fee) + Number(it?.initial_amount) + Number(selectedDeliveryAreaAmount)}</Text>
                            </View>
                        </View>


                    </View>
                })}

                {/* Action Buttons */}
                <View style={styles.actionsContainer}>
                    <TouchableOpacity style={styles.cancelButton} onPress={() => clearProcess()}>
                        <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.payButton}>
                        <Text style={styles.payButtonText}>Pay Securely</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }

    useEffect(() => {
    }, [paymentDetails]);

    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor="#f0f7fa" translucent={true} />
            {paymentDetails && (<PaymentDetailsScreen />)}
            {!paymentDetails && (
            <TouchableWithoutFeedback onPress={dismissKeyboard}>
                <View style={styles.container}>
                    <TouchableOpacity style={[styles.backButton, {flexDirection:'row', alignItems:'center', gap:5}]} onPress={() => RouterUtil.goBack()}>
                        <Ionicons name="arrow-back" size={24} color="#333" />
                        <Text>Transfer to Azapal Business</Text>
                    </TouchableOpacity>
                {/* Tabs */}
                    <View style={styles.section} >
                        <Text style={{fontSize:14}}>DELIVERING TO</Text>
                        <View className="text-end" style={{width:'50%'}}>
                            <TouchableOpacity>
                                <View style={styles.selectorRow}>
                                    <Text style={styles.selectorText}>Change Address</Text>
                                    <Ionicons name="chevron-forward" size={24} color="#000" />
                                </View>
                                <Text numberOfLines={1} ellipsizeMode="tail" style={{textAlign: 'right',fontSize:14}}>
                                    {location?.address}
                                </Text>
                            </TouchableOpacity>

                        </View>
                    </View>

                    <View style={styles.tabContainer}>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'Send Money' && styles.activeTab]}
                        onPress={() => handleTabPress('Send Money')}
                    >
                        <Text style={[styles.tabText, activeTab === 'Send Money' && styles.activeTabText]}>
                            Send Money
                        </Text>
                        {activeTab === 'Send Money' && <View style={styles.activeTabIndicator} />}
                    </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.tab, activeTab === 'Favorites' && styles.activeTab]}
                            onPress={() => handleTabPress('Favorites')}
                        >
                            <Text style={[styles.tabText, activeTab === 'Favorites' && styles.activeTabText]}>
                                Favorites
                            </Text>
                            {activeTab === 'Favorites' && <View style={styles.activeTabIndicator} />}
                        </TouchableOpacity>
                </View>

                <View style={styles.divider} />

                {/* Form Fields */}
                    {activeTab === 'Send Money' ?
                <View style={styles.formContainer}>
                    <View style={styles.inputGroup}>
                        <DefaultTextInput formik={formik} placeholder="Enter business name" name={'business_identification_name'} label={'Business'}/>
                    </View>

                    <View style={styles.inputGroup}>
                        <DefaultTextInput formik={formik} name={'amount'} label={'Amount'}/>
                    </View>

                    <View style={styles.inputGroup}>
                        <DefaultTextInput formik={formik} name={'remarks'} label={'Remarks'}/>
                    </View>

                    {/* Bank Information Notice */}
                    <View style={styles.noticeContainer}>
                        <Text style={styles.noticeText}>
                            You must <Text style={styles.blueText}>Add a Bank Information</Text> before you can send money
                        </Text>
                    </View>

                    {/* Look Up Button */}
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={() => formik.handleSubmit()}>
                            {loading ?  <ActivityIndicator  size="small"/> :
                            <Text style={styles.buttonText}>Look up</Text>
                            }
                        </TouchableOpacity>
                    </View>
                </View>
                        :


                        <View className="flex items-center">
                            <View >
                                <Ionicons name="receipt-outline" size={40} color="#333" />
                            </View>

                            <Text className="text-center">
                                Your most recent and favorite business will appear here.
                            </Text>
                        </View>
                    }

                </View>

            </TouchableWithoutFeedback>)}


        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0

    },
    locationPrefContainer: {
        padding: 15,
        backgroundColor: '#f9f9f9',
        marginBottom: 10,
        borderRadius: 5,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        height: 20,
        width: 20,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#333',
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxChecked: {
        backgroundColor: '#333',
    },
    checkboxLabel: {
        flex: 1,
        fontSize: 14,
    },

    section: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 24,
        paddingHorizontal: 0,
    },
    selectorRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    selectorText: {
        marginRight: 8,
        color: '#181725',
        fontSize: 14
    },
    backButton: {
        padding: 0,
    },
    tabContainer: {
        flexDirection: 'row',
        marginTop: 16,
    },
    tab: {
        marginRight: 24,
        paddingVertical: 12,
        position: 'relative',
    },
    activeTab: {
        position: 'relative',
    },
    tabText: {
        fontSize: 16,
        color: '#333',
    },
    activeTabText: {
        fontSize: 16,
        color: '#0066ff',
        fontWeight: '600',
    },
    activeTabIndicator: {
        position: 'absolute',
        bottom: -1,
        left: 0,
        right: 0,
        height: 3,
        backgroundColor: '#0066ff',
        borderRadius: 1.5,
    },
    divider: {
        height: 1,
        backgroundColor: '#e0e0e0',
        marginBottom: 24,
    },
    formContainer: {
        flex: 1,
    },
    inputGroup: {
        marginBottom: 10,
        position: 'relative',
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 8,
        color: '#333',
    },
    inputWrapper: {
        position: 'relative',
    },
    input: {
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 14,
        fontSize: 16,
        backgroundColor: '#fff',
    },
    helperText: {
        fontSize: 14,
        color: '#888',
        marginTop: 4,
    },
    tooltip: {
        position: 'absolute',
        top: '50%',
        right: 12,
        backgroundColor: 'rgba(0,0,0,0.7)',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 4,
        transform: [{ translateY: -12 }],
    },
    tooltipText: {
        color: '#fff',
        fontSize: 14,
    },
    noticeContainer: {
        marginTop: 0,
        marginBottom: 24,
    },
    noticeText: {
        fontSize: 14,
        color: '#333',
    },
    blueText: {
        color: '#0066ff',
        fontWeight: '500',
    },
    buttonContainer: {
        alignItems: 'flex-end',
    },
    button: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#333',
        borderRadius: 8,
        paddingVertical: 14,
        paddingHorizontal: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#333',
        fontSize: 16,
        fontWeight: '500',
    },

    content: {
        flex: 1,
        paddingHorizontal: 16,
    },
    paymentToCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        marginBottom: 16,
    },
    recipientContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#e6dbf0',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    avatarText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#6b21a8',
    },
    recipientName: {
        fontSize: 14,
        fontWeight: '600',
    },
    protectedBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        backgroundColor: '#d1fae5',
        borderRadius: 16,
    },
    protectedText: {
        color: '#065f46',
        fontWeight: '500',
    },
    sectionCard: {
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 16,
    },
    deliveryOptionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    deliveryOption: {
        width: '100%',
        padding: 16,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 8,
        marginBottom:5
    },
    selectedDeliveryOption: {
        borderColor: '#0066ff',
        backgroundColor: '#f0f7ff',
    },
    deliveryOptionTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
    },
    deliveryOptionPrice: {
        fontSize: 16,
        color: '#555',
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    summaryLabel: {
        fontSize: 16,
        color: '#555',
    },
    summaryValue: {
        fontSize: 16,
        fontWeight: '600',
    },
    deliveryContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    deliveryLocationText: {
        fontSize: 14,
        color: '#f00',
        marginRight: 6,
    },
    totalRow: {
        marginTop: 16,
        marginBottom: 0,
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: '600',
    },
    totalValue: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    cancelButton: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        paddingVertical: 16,
        borderRadius: 8,
        marginRight: 8,
        alignItems: 'center',
    },
    cancelButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    payButton: {
        flex: 1,
        // ffd7c3
        backgroundColor: '#F15A24',
        paddingVertical: 16,
        borderRadius: 8,
        marginLeft: 8,
        alignItems: 'center',
    },
    payButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },
});

export default Send;

