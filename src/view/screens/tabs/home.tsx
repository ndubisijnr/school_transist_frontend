import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
  TouchableOpacity,
  Modal,
  Image,
  StatusBar,
  Platform,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { RootState } from "@/store";
import {useRouter} from "expo-router";
import {RouterUtil} from "@/utility/RouterUtil";
import {persistStore} from "redux-persist";
import {useStore} from "react-redux";
import {useDispatch} from "react-redux";
import {ContainerScrollViewLayout, ContainerScrollViewLayoutProps} from "@/view/layout/ContainerScrollViewLayout";
import app from "@/store/modules/app";
import MapComponent from "@/component/mapComponent";
import Select from "@/component/select/Select";
import {ResponseUtil} from "@/utility/ResponseUtil";
import {usePaystack} from "react-native-paystack-webview";
import {CreateRideRequest} from "@/model/request/app/AppRequest";


const DashboardScreen = () => {
  const [showMenu, setShowMenu] = useState(false)
  const {userDetails} = useSelector((state: RootState) => state.auth)
  const {locations} = useSelector((state: RootState) => state.app)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();
  const router = useRouter();
  const store = useStore();
  const persistor = persistStore(store);
  const [showFrom, setShowFrom] = useState(false);
  const [selectedToValue, setSelectedToValue] = useState(null);
  const [selectedFromValue, setSelectedFromValue] = useState(null);
  const [showTo, setShowTo] = useState(false);
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [showRideRequest, setShowRideRequest] = useState(false);
  const [approvingRide, setApprovingRide] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState('online');
  const [walletBalance] = useState(0);
  const [requestedRide, setRequestedRide] = useState([])
  const [approvedRide, setApprovedRide] = useState([])
  const { popup } = usePaystack();
  const [currentRideIndex, setCurrentRideIndex] = useState(0);
  const requestedRideRef = useRef(requestedRide);

  useEffect(() => {
    requestedRideRef.current = requestedRide;
  }, [requestedRide]);

  const toOptions:any = locations?.map(item => {
    return {
      value: item.area_name,
      label: item.area_name
    };
  })

  const fromOptions:any = locations?.map(item => {
    return {
      value: item.area_name,
      label: item.area_name
    };
  })

  // function generateReference(length = 10, prefix = '', suffix = '') {
  //   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  //   let randomPart = '';
  //
  //   for (let i = 0; i < length; i++) {
  //     const randomIndex = Math.floor(Math.random() * characters.length);
  //     randomPart += characters[randomIndex];
  //   }
  //
  //   return `${prefix}${randomPart}${suffix}`;
  // }

  // Example usage:
  // console.log(generateReference(12, 'REF-', '-NG'));     // e.g. 'REF-A9DKXMP4TQWL-NG'


  const updateDriversLocation = () => {
    ResponseUtil.toast('Location updated successfully', 'success');
  }

  const handleCancelRide = (ride) => {
    Alert.alert(
        "Cancel Ride",
        "Are you sure you want to cancel this ride? You may be charged a cancellation fee.",
        [
          {
            text: "Keep Ride",
            style: "cancel",

          },
          {
            text: "Cancel Ride",
            style: "destructive",
            onPress: () => {
              // Simulate API call
              Alert.alert("Ride Cancelled", "Your ride has been cancelled successfully.");
              cancelRide(ride).then()
            }
          }
        ]
    );
  };


  const handleBookRide = () => {
    ResponseUtil.toast('Requesting ride', 'success');
    setShowSummaryModal(true)
  }

  const handlePaymentSelect = (method:any) => {
    setSelectedPayment(method)
  };

  const handleDriverSelect = (driver) => {
    alert(`Booking ride with ${driver.name}. ETA: ${driver.eta}`);
  };

  // const getRideRequest = useCallback(async () => {
  //   if (userDetails.driver_uni?.id) {
  //     try {
  //       const response = await dispatch(app.action.readRides()).unwrap();
  //
  //       if (response.code === "00") {
  //         // 1. Filter for transit_status === "requested"
  //         const newRequestedRides = response.data.filter(
  //             (ride: any) => ride.transit_status === "requested"
  //         );
  //
  //         // 2. Avoid duplicates by checking against existing ride IDs
  //         setRequestedRide(prevState => {
  //           const existingIds = new Set(prevState.map(r => r.id));
  //           const uniqueRides = newRequestedRides.filter(ride => !existingIds.has(ride.id));
  //           return [...prevState, ...uniqueRides];
  //         });
  //       }
  //
  //       if(requestedRide.length && !showRideRequest){
  //         setShowRideRequest(true)
  //       }
  //
  //       if(!requestedRide.length && showRideRequest){
  //         setShowRideRequest(false)
  //       }
  //     } catch (err) {
  //       console.log("Error fetching ride requests:", err);
  //     }
  //   }
  // },[requestedRide, showRideRequest, dispatch]);

  const acceptRide = async (currentRide) => {
    setApprovingRide(true)
    const payload = {
      id:currentRide.id,
      payload:{
        hub:userDetails?.hub?.id,
        transit_status:'accepted'
      }
    }

    try{
      const response = await dispatch(app.action.updateRide(payload)).unwrap()
      setApprovingRide(false)

      if(response.code === "00"){
        ResponseUtil.toast(response.message, '', 'success')
        setRequestedRide([])
        try {
          const response2 =  await dispatch(app.action.readRides()).unwrap()
          if(response2.code === "00"){
            const approvedRides = response2.data.filter(
                (ride: any) => ride.transit_status === "accepted"
            );

            setApprovedRide(prevState => {
              const existingIds = new Set(prevState.map(r => r.id));
              const uniqueRides = approvedRides.filter(ride => !existingIds.has(ride.id));
              return [...prevState, ...uniqueRides];
            })
          }

         }catch (err){
          console.log(err)
        }

        setShowRideRequest(false)
      }else{
        ResponseUtil.toast(response.message, '', 'error')
      }
    }catch (err){
      console.log(err)
      setApprovingRide(false)
      ResponseUtil.toast(err, '', 'error')
    }
  }

  const cancelRide = async (currentRide) => {
    setApprovingRide(true)
    const payload = {
      id:currentRide.id,
      payload:{
        hub:null,
        transit_status:'cancelled'
      }
    }

    try{
      const response = await dispatch(app.action.updateRide(payload)).unwrap()
      setApprovingRide(false)

      if(response.code === "00"){
        ResponseUtil.toast(response.message, '', 'success')
        setApprovedRide([])
        setShowRideRequest(false)
      }else{
        ResponseUtil.toast(response.message, '', 'error')
      }
    }catch (err){
      console.log(err)
      setApprovingRide(false)
      ResponseUtil.toast(err, '', 'error')
    }
  }

  const beginRide = useCallback(async (currentRide) => {
    setApprovingRide(true)
    const payload = {
      id:currentRide.id,
      payload:{
        transit_status:'in_progress'
      }
    }

    try{
      const response = await dispatch(app.action.updateRide(payload)).unwrap()
      setApprovingRide(false)

      if(response.code === "00"){
        ResponseUtil.toast(response.message, '', 'success')
        try {
          const response2 =  await dispatch(app.action.readRides()).unwrap()
          if(response2.code === "00"){
            const approvedRides = response2.data.filter(
                (ride: any) => ride.transit_status === "in_progress"
            );

            setApprovedRide(approvedRides)
          }

        }catch (err){
          console.log(err)
        }
      }else{
        ResponseUtil.toast(response.message, '', 'error')
      }
    }catch (err){
      console.log(err)
      setApprovingRide(false)
      ResponseUtil.toast(err, '', 'error')
    }
  },[dispatch])


  const getRideRequest = useCallback(async () => {
    if (userDetails?.hub?.id) {
      try {
        const response = await dispatch(app.action.readRides()).unwrap();

        if (response.code === "00") {

          if(!approvedRide.length){
            const newRequestedRides = response.data.filter(
                (ride: any) => ride.transit_status === "requested"
            );

            const approvedRides = response.data.filter(
                (ride: any) => ride.transit_status === "accepted" || ride.transit_status === "in_progress"
            );

            // Prevent duplicates
            setRequestedRide(prevState => {
              const existingIds = new Set(prevState.map(r => r.id));
              const uniqueRides = newRequestedRides.filter(ride => !existingIds.has(ride.id));
              return [...prevState, ...uniqueRides];
            });

            setApprovedRide(prevState => {
              const existingIds = new Set(prevState.map(r => r.id));
              const uniqueRides = approvedRides.filter(ride => !existingIds.has(ride.id));
              return [...prevState, ...uniqueRides];
            })
          }

        }

        // ✅ Use latest value from ref (not stale closure)
        if (requestedRideRef.current.length && !showRideRequest) {
          setShowRideRequest(true);
        }

        if (!requestedRideRef.current.length && showRideRequest) {
          setShowRideRequest(false);
        }

      } catch (err) {
        console.log("Error fetching ride requests:", err);
      }
    }
  }, [showRideRequest, dispatch, userDetails?.driver_uni?.id]);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("🔁 Called every 5 seconds");
      getRideRequest()
      // call your function here
    }, 35000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const payNow = async () => {
    if(selectedPayment === 'online') {
      // popup.checkout({
      //   email: 'jane.doe@example.com',
      //   amount: 1000,
      //   reference: generateReference(),
      //   onSuccess: (res) => {
      //     setShowSummaryModal(false)
      //     RouterUtil.navigate('dashboard.rideSearchScreen')
      //   },
      //   onCancel: () => {},
      //   onLoad: (res) => console.log('WebView Loaded:', res),
      //   onError: (err) => console.log('WebView Error:', err)
      // });
      setLoading(true)
      CreateRideRequest.transit_fee = '350'
      CreateRideRequest.transit_status = 'requested'
      CreateRideRequest.review_comment = "NA"
      CreateRideRequest.where_from = selectedFromValue
      CreateRideRequest.where_to = selectedToValue
      CreateRideRequest.seater = "two"
      CreateRideRequest.student = userDetails?.student?.id
      try{
        const response = await dispatch(app.action.createRide(CreateRideRequest)).unwrap()
        setLoading(false)
        if(response.code === "00"){
          setShowSummaryModal(false)
          await RouterUtil.navigate('dashboard.rideSearchScreen')

        }else{
          ResponseUtil.toast(response.message, '', 'error')
        }
      }catch (e){
        setLoading(false)
        ResponseUtil.toast(e, '', 'error')
      }

    }
    else{
      Alert.alert('feature not available yet')
    }


  };

  useEffect(() => {

    dispatch(app.action.readLocations(userDetails?.uni?.id || userDetails?.driver_uni?.id))

  }, [userDetails])


  return( <ContainerScrollViewLayout>

        <View className="relative flex-1">
          <MapComponent />

          <View className="relative overflow-hidden">
          <View style={styles.header} className="absolute top-5 right-[130px]">
            <View className="bg-white p-4 rounded-lg shadow-sm p-4">
              <View className="flex-row items-center gap-2">
                <Ionicons name="star" size={18} color="gold" />
                <Text className="text-[#666]">
                  {userDetails?.student?.full_name ? userDetails?.student?.full_name.toLowerCase() : userDetails?.hub?.driver_fullname.toLowerCase()}
                </Text>
              </View>
              <Text className="mt-2 text-[#666]">at {userDetails?.uni?.name || userDetails?.driver_uni?.name}</Text>
            </View>
          </View>
          <View className="w-full h-full relative">

            <View className="absolute bg-white  w-full bottom-0 rounded p-3">
              {userDetails?.student ? (
                  <View className="mt-3">
                    <Select
                        label="Where from"
                        options={fromOptions}
                        value={selectedFromValue}
                        onValueChange={setSelectedFromValue}
                        placeholder="From"
                        searchable
                        searchPlaceholder="Where from..."
                    />

                    <Select
                        label="Select Your destination"
                        options={toOptions}
                        value={selectedToValue}
                        onValueChange={setSelectedToValue}
                        placeholder="To"
                        searchable
                        searchPlaceholder="Your destination..."
                    />

                    <TouchableOpacity
                        className="bg-[#222] p-3 rounded-[18px] mt-4"
                        onPress={handleBookRide}
                    >
                      <Text className="text-white text-center">Request Ride</Text>
                    </TouchableOpacity>
                  </View>
              ) : (
                  <View className="mt-3">
                    {approvedRide.length > 0 && approvedRide[0]?.student && (
                        <View>
                          <ScrollView className="flex-1 bg-gray-50">
                            <View className="px-5 pt-12 pb-6">
                              {/* Header */}
                              <View className="items-center mb-8">
                                <Text className="text-2xl font-bold text-gray-900 mb-1">
                                  Ride Accepted
                                </Text>
                              </View>

                              {/* Status Card */}
                              <View className="bg-blue-50 rounded-2xl p-4 mb-6 border border-blue-100">
                                <View className="flex-row items-center justify-center">
                                  <Ionicons name="timer" size={20} color="#3B82F6" />
                                  <Text className="text-lg font-semibold text-blue-800 ml-2">
                                    {approvedRide[0]?.transit_status === 'accepted' ? 'Picking up' : 'Driving'} {approvedRide[0]?.student.name} {approvedRide[0]?.transit_status === 'in_progress' && ('to destination')}
                                  </Text>
                                </View>
                              </View>

                              {/* Driver Card */}
                              {/*<View className="bg-white rounded-2xl p-5 mb-6 shadow-sm">*/}
                              {/*  <View className="flex-row items-center justify-between">*/}
                              {/*    <View className="flex-row items-center flex-1">*/}
                              {/*      <Image*/}
                              {/*          source={{ uri: driverData.profileImage }}*/}
                              {/*          className="w-16 h-16 rounded-full mr-4"*/}
                              {/*      />*/}
                              {/*    </View>*/}

                              {/*    /!* Action Buttons *!/*/}
                              {/*    <View className="flex-row space-x-3">*/}
                              {/*      <TouchableOpacity*/}
                              {/*          className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center"*/}
                              {/*      >*/}
                              {/*        <Ionicons name="phone-portrait" size={20} color="#3B82F6" />*/}

                              {/*      </TouchableOpacity>*/}
                              {/*      <TouchableOpacity*/}
                              {/*          className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center"*/}
                              {/*      >*/}
                              {/*        <Ionicons name="chatbox" size={20} color="#3B82F6" />*/}
                              {/*      </TouchableOpacity>*/}
                              {/*    </View>*/}
                              {/*  </View>*/}
                              {/*</View>*/}

                              {/* Trip Details Card */}
                              <View className="bg-white rounded-2xl p-5 mb-6 shadow-sm">
                                <Text className="text-lg font-bold text-gray-900 mb-4">
                                  Trip Details
                                </Text>

                                {/* Pickup Location */}
                                <View className="flex-row items-start mb-3">
                                  <View className="w-5 items-center mr-3 mt-1">
                                    <View className="w-3 h-3 bg-green-500 rounded-full" />
                                  </View>
                                  <View className="flex-1">
                                    <Text className="text-sm text-gray-500 mb-1">Pickup</Text>
                                    <Text className="text-base text-gray-900">
                                      {approvedRide[0]?.where_from}
                                    </Text>
                                  </View>
                                </View>

                                {/* Connector Line */}
                                <View className="flex-row mb-3">
                                  <View className="w-5 items-center mr-3">
                                    <View className="w-0.5 h-6 bg-gray-300" />
                                  </View>
                                </View>

                                {/* Destination */}
                                <View className="flex-row items-start mb-4">
                                  <View className="w-5 items-center mr-3 mt-1">
                                    <Ionicons name="map" size={12} color="#EF4444" fill="#EF4444" />
                                  </View>
                                  <View className="flex-1">
                                    <Text className="text-sm text-gray-500 mb-1">Destination</Text>
                                    <Text className="text-base text-gray-900">
                                      {approvedRide[0]?.where_to}
                                    </Text>
                                  </View>
                                </View>

                                {/* Trip Info */}
                                {/*<View className="border-t border-gray-200 pt-4">*/}
                                {/*  <View className="flex-row justify-between items-center mb-2">*/}
                                {/*    <Text className="text-sm text-gray-600">Distance</Text>*/}
                                {/*    <Text className="text-sm font-medium text-gray-900">*/}
                                {/*      {rideData.distance}*/}
                                {/*    </Text>*/}
                                {/*  </View>*/}
                                {/*  <View className="flex-row justify-between items-center mb-2">*/}
                                {/*    <Text className="text-sm text-gray-600">Duration</Text>*/}
                                {/*    <Text className="text-sm font-medium text-gray-900">*/}
                                {/*      {rideData.duration}*/}
                                {/*    </Text>*/}
                                {/*  </View>*/}
                                {/*  <View className="flex-row justify-between items-center">*/}
                                {/*    <Text className="text-base text-gray-900">Estimated Fare</Text>*/}
                                {/*    <Text className="text-lg font-bold text-gray-900">*/}
                                {/*      {rideData.fareEstimate}*/}
                                {/*    </Text>*/}
                                {/*  </View>*/}
                                {/*</View>*/}
                              </View>



                              {/* Cancel Button */}

                              {approvedRide[0]?.transit_status === 'accepted' ?
                                  <View>
                                    <TouchableOpacity
                                        className="bg-[#222] p-3 rounded-[18px] mb-5"
                                        onPress={() => beginRide(approvedRide[0])}
                                    >
                                      <Text className="text-white text-center">Begin Ride</Text>
                                    </TouchableOpacity>
                                <TouchableOpacity
                                    className={`bg-white border-2 border-red-500 rounded-2xl p-4 flex-row items-center justify-center mb-6 ${
                                        approvingRide ? 'opacity-60' : ''
                                    }`}
                                    onPress={() => handleCancelRide(approvedRide[0])}
                                    disabled={approvingRide}
                                >
                                  <Ionicons name="close" size={20} color="#EF4444" />
                                  <Text className="text-red-500 font-semibold text-base ml-2">
                                    {approvingRide ? "Cancelling..." : "Cancel Ride"}
                                  </Text>
                                </TouchableOpacity>
                              </View>
                                  :

                                  <Text className="text-center text-md text-gray-500 mb-3">
                                    Enjoy the trip. if you want to cancel, ask the student to cancel
                                  </Text>

                              }


                              {/* Footer */}
                              <Text className="text-center text-sm text-gray-500">
                                Need help? Contact support at any time.
                              </Text>
                            </View>
                          </ScrollView>


                        </View>
                    )}
                  </View>
              )}

            </View>
          </View>
          </View>

        </View>

        <Modal visible={showSummaryModal}
               animationType="slide"
               presentationStyle="pageSheet"
               onRequestClose={() => setShowSummaryModal(false)}>


          <View className=" bg-gray-50">
            <View className=" overflow-hidden">
              {/* Header */}
              <View className="bg-black text-white p-6">
                <Text className="text-2xl text-blue-100 font-bold text-center">Ride Summary</Text>
                <Text className="text-blue-100 text-center mt-1">Review your trip details</Text>
              </View>

              {/* Trip Details */}
              <View className="p-6 space-y-6">
                {/* Locations */}
                <View className="space-y-4 mb-2">
                  <View className="flex-row items-center gap-2">
                    <View className="w-3 h-3 bg-green-500 rounded-full"></View>
                    <View className="">
                      <Text className="text-gray-500">Pickup</Text>
                      <Text className="font-semibold text-gray-800">{selectedFromValue}</Text>
                    </View>
                  </View>

                  <View className="ml-6 border-l-2 border-dashed border-gray-300 h-8"></View>

                  <View className="flex-row items-center gap-2">
                    <View className="w-3 h-3 bg-red-500 rounded-full"></View>
                    <View className="">
                      <Text className="text-sm text-gray-500">Destination</Text>
                      <Text className="font-semibold text-gray-800">{selectedToValue}</Text>
                    </View>
                  </View>
                </View>


                {/* Fare Breakdown */}
                <View className="border-t border-gray-200 pt-4">
                  <View className="flex-row justify-between items-center mb-2">
                    <Text className="text-gray-600">Base Fare</Text>
                    <Text className="text-gray-800">₦300.00</Text>
                  </View>
                  <View className="flex-row justify-between items-center mb-4">
                    <Text className="text-gray-600">Service Fee</Text>
                    <Text className="text-gray-800">₦50.00</Text>
                  </View>
                  <View className="flex-row justify-between items-center text-lg font-bold border-t border-gray-200 pt-4">
                    <Text className="text-gray-800">Total</Text>
                    <Text className="text-blue-600">₦350.00</Text>
                  </View>
                </View>
              </View>

              <View className="">
                <View className="overflow-hidden">
                  {/* Header */}
                  <View className="pl-6">
                    <Text className="text-xl text-blackfont-bold text-left">Payment Method</Text>
                    <Text className="text-black text-left mt-1">Choose how to pay</Text>
                  </View>
                </View>
                <View className="p-6 space-y-4">
                  {/* Wallet Option */}
                  <Pressable
                      onPress={() => handlePaymentSelect('wallet')}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                          selectedPayment === 'wallet'
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                      }`}
                  >
                    <View className="flex-row items-center justify-between">
                      <View className="flex-row gap-1 items-center space-x-4">
                        <View className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        </View>
                        <View>
                          <Text className="font-semibold text-gray-800">Wallet</Text>
                          <Text className="text-sm text-gray-500">Balance: ₦{walletBalance.toFixed(2)}</Text>
                        </View>
                      </View>
                      <View className={`w-5 h-5 rounded-full border-2 ${
                          selectedPayment === 'wallet'
                              ? 'border-blue-500 bg-blue-500'
                              : 'border-gray-300'
                      }`}>
                        {selectedPayment === 'wallet' && (
                            <View className="w-full h-full rounded-full bg-blue-500 flex items-center justify-center">
                              <View className="w-2 h-2 bg-white rounded-full"></View>
                            </View>
                        )}
                      </View>
                    </View>
                    {walletBalance < 350.00 && (
                        <Text className="text-red-500 text-sm mt-2">Insufficient balance</Text>
                    )}
                  </Pressable>

                  {/* Transfer Option */}
                  <Pressable
                      onPress={() => handlePaymentSelect('online')}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all mt-2 ${
                          selectedPayment === 'online'
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                      }`}
                  >
                    <View className="flex-row items-center justify-between">
                      <View className="flex-row items-center gap-1 space-x-4">
                        <View className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        </View>
                        <View>
                          <Text className="font-semibold text-gray-800">Online Payment(PAYSTACK)</Text>
                          <Text className="text-sm text-gray-500">Pay via bank transfer</Text>
                        </View>
                      </View>
                      <View className={`w-5 h-5 rounded-full border-2 ${
                          selectedPayment === 'online'
                              ? 'border-blue-500 bg-blue-500'
                              : 'border-gray-300'
                      }`}>
                        {selectedPayment === 'transfer' && (
                            <View className="w-full h-full rounded-full bg-blue-500 flex items-center justify-center">
                              <View className="w-2 h-2 bg-white rounded-full"></View>
                            </View>
                        )}
                      </View>
                    </View>
                  </Pressable>

              </View>


              {/* Continue Button */}
              <View className="p-6 border-t border-gray-200">
                <TouchableOpacity onPress={() => payNow()}
                                  disabled={loading}
                    className="w-full bg-black py-4 rounded-lg disabled:opacity-20 font-semibold text-lg hover:bg-blue-700 transition-colors"
                >
                  {loading && ( <ActivityIndicator />)}
                  {!loading && (<Text className="text-white text-center"> Proceed </Text>)}
                </TouchableOpacity>
                <TouchableOpacity
                    className="w-full bg-red-500 mt-3 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors"
                    onPress={() => setShowSummaryModal(false)}
                >
                  <Text className="text-white text-center"> Cancel Ride </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          </View>


        </Modal>


        <Modal
            visible={showRideRequest}
            animationType="slide"
            transparent
            onRequestClose={() => setShowRideRequest(false)}
        >
          {requestedRide.length > 0 && (
              <View className="flex-1 justify-center items-center bg-black/30">
                <View className="bg-gray-50 border rounded-xl w-[90%] max-h-[85%] overflow-hidden">
                  {/* Header */}
                  <View className="bg-black text-white p-4 rounded-t-xl">
                    <Text className="text-2xl text-blue-100 font-bold text-center">Ride Request</Text>
                  </View>

                  {/* Scrollable Content */}
                  <ScrollView className="p-6 space-y-6" showsVerticalScrollIndicator={false}>
                    {/* Pickup & Destination */}
                    <Text>{requestedRide.length}</Text>
                    <View className="space-y-4 mb-2">
                      <View className="flex-row items-center gap-2">
                        <View className="w-3 h-3 bg-green-500 rounded-full" />
                        <View>
                          <Text className="text-gray-500">Pickup</Text>
                          <Text className="font-semibold text-gray-800">
                            {requestedRide[currentRideIndex]?.where_from}
                          </Text>
                        </View>
                      </View>

                      <View className="ml-6 border-l-2 border-dashed border-gray-300 h-8" />

                      <View className="flex-row items-center gap-2">
                        <View className="w-3 h-3 bg-red-500 rounded-full" />
                        <View>
                          <Text className="text-sm text-gray-500">Destination</Text>
                          <Text className="font-semibold text-gray-800">
                            {requestedRide[currentRideIndex]?.where_to}
                          </Text>
                        </View>
                      </View>
                    </View>

                    {/* Fare Breakdown */}
                    <View className="border-t border-gray-200 pt-4">
                      <View className="flex-row justify-between items-center mb-2">
                        <Text className="text-gray-600">Base Fare</Text>
                        <Text className="text-gray-800">₦300.00</Text>
                      </View>
                      <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-gray-600">Service Fee</Text>
                        <Text className="text-gray-800">₦50.00</Text>
                      </View>
                      <View className="flex-row justify-between items-center text-lg font-bold border-t border-gray-200 pt-4">
                        <Text className="text-gray-800">Total</Text>
                        <Text className="text-blue-600">₦350.00</Text>
                      </View>
                    </View>
                  </ScrollView>

                  {/* Actions */}
                  <View className="p-6 border-t border-gray-200">
                    <TouchableOpacity
                        onPress={() => acceptRide(requestedRide[currentRideIndex])}
                        disabled={approvingRide}
                        className="w-full bg-black py-4 rounded-lg disabled:opacity-20"
                    >
                      {approvingRide ? (
                          <ActivityIndicator color="#fff" />
                      ) : (
                          <Text className="text-white text-center font-semibold text-lg">Accept Ride</Text>
                      )}
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                          // Move cancelled ride to the end
                          const current = requestedRide[currentRideIndex];
                          const updated = [...requestedRide.slice(0, currentRideIndex), ...requestedRide.slice(currentRideIndex + 1), current];

                          setRequestedRide(updated);

                          // Move to next ride, or close modal
                          if (updated.length - 1 === currentRideIndex) {
                            if (updated.length === 1) {
                              setRequestedRide([]);
                              setShowRideRequest(false);
                            } else {
                              setCurrentRideIndex(0);
                            }
                          }
                        }}
                        className="w-full bg-red-500 mt-3 py-4 rounded-lg"
                    >
                      <Text className="text-white text-center font-semibold text-lg">Cancel Ride</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
          )}

        </Modal>


  </ContainerScrollViewLayout>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,

  },
  locationContainer: {
    flexDirection: 'row',

    alignItems: 'center',
    width:'70%',
  },
  locationText: {
    fontSize: 18,
    color: '#000',
    marginLeft: 4,
    marginRight: 2,
    flex: 1
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  menuButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#9C27B0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 4,
  },
  profileLetter: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  // profileContainer: {
  //   position: 'relative',
  // },
  // profileImage: {
  //   width: 30,
  //   height: 30,
  //   borderRadius: 20,
  // },
  // notificationBadge: {
  //   position: 'absolute',
  //   right: -2,
  //   top: -2,
  //   backgroundColor: 'red',
  //   width: 18,
  //   height: 18,
  //   borderRadius: 9,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // notificationText: {
  //   color: 'white',
  //   fontSize: 10,
  //   fontWeight: 'bold',
  // },
  //
  content: {
    flex: 1,
    paddingHorizontal: 0,
  },
  card: {
    borderRadius: 12,
    padding: 10,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    paddingHorizontal: 0,
    marginBottom:16
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressInfo: {
    flex: 1,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  progressSubtitle: {
    fontSize: 14,
    color: '#fff',
  },
  progressCircleContainer: {
    marginLeft: 10,
  },
  progressCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  progressFill: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 5,
    // borderColor: 'green',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    transform: [{ rotate: '360deg' }],
  },
  progressCenter: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
    position: 'absolute',
  },
  progressText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  tabLabel: {
    marginTop: 4,
    fontSize: 12,
    color: '#333',
  },
  tabLabelInactive: {
    color: '#888',
  },
  tabIndicatorContainer: {
    height: 4,
    backgroundColor: 'white',
    position: 'relative',
  },
  tabIndicator: {
    position: 'absolute',
    left: '16.7%',
    width: '16.7%',
    height: 4,
    backgroundColor: '#333',
    borderRadius: 2,
  },

  menuheader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
  },

  menuSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  sectionContent: {
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  iconContainer: {
    width: 32,
    alignItems: 'center',
    marginRight: 16,
  },
  menuItemText: {
    fontSize: 13,
    color: '#333',
    flex: 1,
  },
  bottomIndicatorContainer: {
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomIndicator: {
    width: 40,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 3,
  },
});

export default DashboardScreen