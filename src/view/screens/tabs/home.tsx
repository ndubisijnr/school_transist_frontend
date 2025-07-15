import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Pressable,
  Alert,
  TouchableOpacity,
  Modal,
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
import {useStore} from "react-redux";
import {useDispatch} from "react-redux";
import {ContainerScrollViewLayout} from "@/view/layout/ContainerScrollViewLayout";
import app from "@/store/modules/app";
import MapComponent from "@/component/mapComponent";
import Select from "@/component/select/Select";
import {ResponseUtil} from "@/utility/ResponseUtil";
// import {usePaystack} from "react-native-paystack-webview";
import {CreateRideRequest} from "@/model/request/app/AppRequest";

// Types for better type safety
interface Location {
  id: string;
  area_name: string;
}

interface Ride {
  id: string;
  transit_status: 'requested' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';
  where_from: string;
  where_to: string;
  student: {
    id: string;
    name: string;
  };
  hub?: {
    id: string;
  };
  transit_fee: string;
}

interface UserDetails {
  student?: {
    id: string;
    name: string;
  };
  driver_uni?: {
    id: string;
  };
  hub?: {
    id: string;
  };
  uni?: {
    id: string;
  };
}

const DashboardScreen = () => {
  const {userDetails}: {userDetails: UserDetails | null} = useSelector((state: RootState) => state.auth);
  const {locations}: {locations: Location[] | null} = useSelector((state: RootState) => state.app);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const store = useStore();
  const [selectedToValue, setSelectedToValue] = useState<string | null>(null);
  const [selectedFromValue, setSelectedFromValue] = useState<string | null>(null);
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [showRideRequest, setShowRideRequest] = useState(false);
  const [approvingRide, setApprovingRide] = useState(false);
  const [startingRide, setStartingRide] = useState(false);
  const [cancellingRide, setCancellingRide] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<'online' | 'wallet'>('online');
  const [walletBalance] = useState(0);
  const [requestedRide, setRequestedRide] = useState<Ride[]>([]);
  const [approvedRide, setApprovedRide] = useState<Ride | null>(null);
  // const { popup } = usePaystack();
  const [currentRideIndex, setCurrentRideIndex] = useState(0);
  const requestedRideRef = useRef<Ride[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Safe options mapping with null checks
  const toOptions = locations?.map(item => ({
    value: item.area_name,
    label: item.area_name
  })) || [];

  const fromOptions = locations?.map(item => ({
    value: item.area_name,
    label: item.area_name
  })) || [];

  const handleCancelRide = (ride: Ride) => {
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
              Alert.alert("Ride Cancelled", "Your ride has been cancelled successfully.");
              cancelRide(ride);
            }
          }
        ]
    );
  };

  const handleBookRide = () => {
    if (!selectedFromValue || !selectedToValue) {
      ResponseUtil.toast('Please select both pickup and destination locations', 'error');
      return;
    }

    if (selectedFromValue === selectedToValue) {
      ResponseUtil.toast('Pickup and destination cannot be the same', 'error');
      return;
    }

    ResponseUtil.toast('Requesting ride', 'success');
    setShowSummaryModal(true);
  };

  const handlePaymentSelect = (method: 'online' | 'wallet') => {
    setSelectedPayment(method);
  };

  // Driver accept ride with better error handling
  const acceptRide = useCallback(async (currentRide: Ride) => {
    if (!userDetails?.hub?.id) {
      ResponseUtil.toast('Hub information not available', 'error');
      return;
    }

    setApprovingRide(true);
    const payload = {
      id: currentRide.id,
      payload: {
        hub: userDetails.hub.id,
        transit_status: 'accepted'
      }
    };

    try {
      const response = await dispatch(app.action.updateRide(payload)).unwrap();

      if (response.code === "00") {
        ResponseUtil.toast(response.message, '', 'success');
        setRequestedRide([]);
        setApprovedRide(currentRide);
        setShowRideRequest(false);
      } else {
        ResponseUtil.toast(response.message, '', 'error');
      }
    } catch (err) {
      console.error('Error accepting ride:', err);
      ResponseUtil.toast('Failed to accept ride', '', 'error');
    } finally {
      setApprovingRide(false);
    }
  }, [userDetails?.hub?.id, dispatch]);

  // Cancel ride with better error handling
  const cancelRide = async (currentRide: Ride) => {
    setCancellingRide(true);
    const payload = {
      id: currentRide.id,
      payload: {
        hub: currentRide?.hub?.id,
        transit_status: 'cancelled'
      }
    };

    try {
      const response = await dispatch(app.action.updateRide(payload)).unwrap();

      if (response.code === "00") {
        ResponseUtil.toast(response.message, '', 'success');
        setApprovedRide(null);
        setShowRideRequest(false);
        setRequestedRide([]);

        // Move to next ride, or close modal
      } else {
        ResponseUtil.toast(response.message, '', 'error');
      }
    } catch (err) {
      console.error('Error cancelling ride:', err);
      ResponseUtil.toast('Failed to cancel ride', '', 'error');
    } finally {
      setCancellingRide(false);
    }
  };

  const beginRide = useCallback(async (currentRide: Ride) => {
    setStartingRide(true);
    const payload = {
      id: currentRide.id,
      payload: {
        transit_status: 'in_progress'
      }
    };

    try {
      const response = await dispatch(app.action.updateRide(payload)).unwrap();

      if (response.code === "00") {
        ResponseUtil.toast(response.message, '', 'success');
        await readCurrentRideUpdate();
      } else {
        ResponseUtil.toast(response.message, '', 'error');
      }
    } catch (err) {
      console.error('Error starting ride:', err);
      ResponseUtil.toast('Failed to start ride', '', 'error');
    } finally {
      setStartingRide(false);
    }
  }, [dispatch]);

  const readCurrentRideUpdate = useCallback(async () => {
    if (!approvedRide?.id) return;

    try {
      const response = await dispatch(app.action.readRideById(approvedRide.id)).unwrap();
      if (response.code === "00") {
        setApprovedRide(response.data);

        if (response.data.transit_status === 'cancelled') {
          Alert.alert('Ride was cancelled');
          setApprovedRide(null);
        }
      }
    } catch (err) {
      console.error('Error reading ride update:', err);
    }
  }, [approvedRide?.id, dispatch]);

  // Improved ride request polling with better error handling
  const getRideRequest = useCallback(async () => {
    console.log("🔁 Called every 5 seconds");

    if (!approvedRide && userDetails?.hub?.id) {
      try {
        const response = await dispatch(app.action.readRides()).unwrap();

        if (response.code === "00" && Array.isArray(response.data)) {
          const newRequestedRides = response.data.filter(
              (ride: Ride) => ride.transit_status === "requested"
          );

          // Prevent duplicates
          setRequestedRide(prevState => {
            const existingIds = new Set(prevState.map(r => r.id));
            const uniqueRides = newRequestedRides.filter((ride: Ride) => !existingIds.has(ride.id));
            return [...prevState, ...uniqueRides];
          });
        }
      } catch (err) {
        console.error("Error fetching ride requests:", err);
      }

      // Use latest value from ref (not stale closure)
      if (requestedRideRef.current.length > 0 && !showRideRequest) {
        setShowRideRequest(true);
      }

      if (requestedRideRef.current.length === 0 && showRideRequest) {
        setShowRideRequest(false);
      }
    } else if (approvedRide) {
      await readCurrentRideUpdate();
    }
  }, [showRideRequest, dispatch, userDetails?.hub?.id, approvedRide]);

  const payNow = async () => {
    if (!selectedFromValue || !selectedToValue) {
      ResponseUtil.toast('Please select pickup and destination', 'error');
      return;
    }

    if (!userDetails?.student?.id) {
      ResponseUtil.toast('Student information not available', 'error');
      return;
    }

    if (selectedPayment === 'online') {
      setLoading(true);

      const rideRequest = {
        ...CreateRideRequest,
        transit_fee: '350',
        transit_status: 'requested',
        review_comment: "NA",
        where_from: selectedFromValue,
        where_to: selectedToValue,
        seater: "two",
        student: userDetails.student.id
      };

      try {
        const response = await dispatch(app.action.createRide(rideRequest)).unwrap();

        if (response.code === "00") {
          setShowSummaryModal(false);
          await RouterUtil.navigate('dashboard.rideSearchScreen');
        } else {
          ResponseUtil.toast(response.message, '', 'error');
        }
      } catch (e) {
        console.error('Error creating ride:', e);
        ResponseUtil.toast('Failed to create ride', '', 'error');
      } finally {
        setLoading(false);
      }
    } else {
      Alert.alert('Feature not available yet');
    }
  };

  const handleNextRide = () => {
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
  };

  const handleProceedAfterCompletion = () => {
    setApprovedRide(null);
    setRequestedRide([]);
  };

  // Update ref when requestedRide changes
  useEffect(() => {
    requestedRideRef.current = requestedRide;
  }, [requestedRide]);

  // Interval setup with cleanup
  useEffect(() => {
    if (userDetails?.hub?.id) {
      intervalRef.current = setInterval(() => {
        getRideRequest();
      }, 5000);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [getRideRequest, userDetails?.hub?.id]);

  // Load locations
  useEffect(() => {
    const uniId = userDetails?.uni?.id || userDetails?.driver_uni?.id;
    if (uniId) {
      dispatch(app.action.readLocations(uniId));
    }
  }, [userDetails, dispatch]);

  return (
      <ContainerScrollViewLayout>
        <View className="relative flex-1">
          <MapComponent />

          <View className="relative overflow-hidden">
            <View className="w-full h-full relative">
              <View className="absolute w-full bottom-0 rounded-lg p-3">
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
                          className="bg-neutral-900 p-3 rounded-2xl mt-4"
                          onPress={handleBookRide}
                      >
                        <Text className="text-white text-center font-medium">Request Ride</Text>
                      </TouchableOpacity>
                    </View>
                ) : (
                    <View className="mt-3">
                      {approvedRide && approvedRide.hub && (
                          <View className="bg-white rounded-lg">
                            <ScrollView className="flex-1">
                              <View className="px-5 pt-12 pb-6">
                                {/* Header */}
                                <View className="items-center mb-8">
                                  <Text className="text-2xl font-bold text-gray-900 mb-1">
                                    {approvedRide.transit_status === 'completed' ? 'Ride Completed' :
                                        approvedRide.transit_status === 'cancelled' ? 'Ride Cancelled' :
                                            approvedRide.transit_status === 'accepted' ? 'Ride Accepted' :
                                                approvedRide.transit_status === 'in_progress' ? 'Ride Ongoing' : 'Ride Status'}
                                  </Text>
                                </View>

                                {/* Status Card */}
                                <View className="bg-blue-50 rounded-2xl p-4 mb-6 border border-blue-100">
                                  <View className="flex-row items-center justify-center">
                                    <Ionicons name="timer" size={20} color="#3B82F6" />
                                    <Text className="text-lg font-semibold text-blue-800 ml-2">
                                      {approvedRide.transit_status === 'completed' ? 'Ride Completed' :
                                          approvedRide.transit_status === 'accepted' ? `Picking up ${approvedRide.student?.name || 'Student'} from ${approvedRide.where_from}` :
                                              approvedRide.transit_status === 'in_progress' ? `Driving ${approvedRide.student?.name || 'Student'} to ${approvedRide.where_to}` :
                                                  approvedRide.transit_status === 'cancelled' ? 'Ride was cancelled' : 'Processing...'}
                                    </Text>
                                  </View>
                                </View>

                                {/* Trip Details Card */}
                                <View className="bg-white rounded-2xl p-5 mb-6 shadow-sm border border-gray-100">
                                  <Text className="text-lg font-bold text-gray-900 mb-4">Trip Details</Text>

                                  {/* Pickup Location */}
                                  <View className="flex-row items-start mb-3">
                                    <View className="w-5 items-center mr-3 mt-1">
                                      <View className="w-3 h-3 bg-green-500 rounded-full" />
                                    </View>
                                    <View className="flex-1">
                                      <Text className="text-sm text-gray-500 mb-1">Pickup</Text>
                                      <Text className="text-base text-gray-900">{approvedRide.where_from}</Text>
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
                                      <Ionicons name="location" size={12} color="#EF4444" />
                                    </View>
                                    <View className="flex-1">
                                      <Text className="text-sm text-gray-500 mb-1">Destination</Text>
                                      <Text className="text-base text-gray-900">{approvedRide.where_to}</Text>
                                    </View>
                                  </View>
                                </View>

                                {/* Action Buttons */}
                                {approvedRide.transit_status === 'accepted' ? (
                                    <View>
                                      <TouchableOpacity
                                          className="bg-neutral-900 p-3 rounded-2xl mb-5"
                                          onPress={() => beginRide(approvedRide)}
                                          disabled={startingRide || cancellingRide}
                                      >
                                        {startingRide ? (
                                            <ActivityIndicator color="#fff" />
                                        ) : (
                                            <Text className="text-white text-center font-medium">Begin Ride</Text>
                                        )}
                                      </TouchableOpacity>

                                      <TouchableOpacity
                                          className={`bg-white border-2 border-red-500 rounded-2xl p-4 flex-row items-center justify-center mb-6 ${
                                              approvingRide || startingRide || cancellingRide ? 'opacity-60' : ''
                                          }`}
                                          onPress={() => handleCancelRide(approvedRide)}
                                          disabled={approvingRide || startingRide || cancellingRide}
                                      >
                                        <Ionicons name="close" size={20} color="#EF4444" />
                                        <Text className="text-red-500 font-semibold text-base ml-2">
                                          {cancellingRide ? "Cancelling..." : "Cancel Ride"}
                                        </Text>
                                      </TouchableOpacity>
                                    </View>
                                ) : approvedRide.transit_status === 'completed' ? (
                                    <TouchableOpacity
                                        className="bg-neutral-900 p-3 rounded-2xl mb-5"
                                        onPress={handleProceedAfterCompletion}
                                    >
                                      <Text className="text-white text-center font-medium">Proceed</Text>
                                    </TouchableOpacity>
                                ) : (
                                    <Text className="text-center text-base text-gray-500 mb-3">
                                      Enjoy the trip. If you want to cancel, ask the student to cancel
                                    </Text>
                                )}

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

        {/* Ride Summary Modal */}
        <Modal
            visible={showSummaryModal}
            animationType="slide"
            presentationStyle="pageSheet"
            onRequestClose={() => setShowSummaryModal(false)}
        >
          <View className="flex-1 bg-gray-50">
            <View className="flex-1">
              {/* Header */}
              <View className="bg-black p-6">
                <Text className="text-2xl text-blue-100 font-bold text-center">Ride Summary</Text>
                <Text className="text-blue-100 text-center mt-1">Review your trip details</Text>
              </View>

              {/* Trip Details */}
              <View className="p-6">
                <View className="mb-6">
                  <View className="flex-row items-center mb-4">
                    <View className="w-3 h-3 bg-green-500 rounded-full mr-3" />
                    <View>
                      <Text className="text-gray-500">Pickup</Text>
                      <Text className="font-semibold text-gray-800">{selectedFromValue}</Text>
                    </View>
                  </View>

                  <View className="ml-6 border-l-2 border-dashed border-gray-300 h-8 mb-4" />

                  <View className="flex-row items-center">
                    <View className="w-3 h-3 bg-red-500 rounded-full mr-3" />
                    <View>
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
                  <View className="flex-row justify-between items-center border-t border-gray-200 pt-4">
                    <Text className="text-lg font-bold text-gray-800">Total</Text>
                    <Text className="text-lg font-bold text-blue-600">₦350.00</Text>
                  </View>
                </View>

                {/* Payment Methods */}
                <View className="mt-6">
                  <Text className="text-xl font-bold text-black mb-2">Payment Method</Text>
                  <Text className="text-black mb-4">Choose how to pay</Text>

                  {/* Wallet Option */}
                  <Pressable
                      onPress={() => handlePaymentSelect('wallet')}
                      className={`border-2 rounded-lg p-4 mb-4 ${
                          selectedPayment === 'wallet'
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200'
                      }`}
                  >
                    <View className="flex-row items-center justify-between">
                      <View className="flex-row items-center">
                        <View className="w-12 h-12 bg-green-100 rounded-full mr-4" />
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
                            <View className="w-full h-full rounded-full bg-blue-500 items-center justify-center">
                              <View className="w-2 h-2 bg-white rounded-full" />
                            </View>
                        )}
                      </View>
                    </View>
                    {walletBalance < 350.00 && (
                        <Text className="text-red-500 text-sm mt-2">Insufficient balance</Text>
                    )}
                  </Pressable>

                  {/* Online Payment Option */}
                  <Pressable
                      onPress={() => handlePaymentSelect('online')}
                      className={`border-2 rounded-lg p-4 ${
                          selectedPayment === 'online'
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200'
                      }`}
                  >
                    <View className="flex-row items-center justify-between">
                      <View className="flex-row items-center">
                        <View className="w-12 h-12 bg-blue-100 rounded-full mr-4" />
                        <View>
                          <Text className="font-semibold text-gray-800">Online Payment (PAYSTACK)</Text>
                          <Text className="text-sm text-gray-500">Pay via bank transfer</Text>
                        </View>
                      </View>
                      <View className={`w-5 h-5 rounded-full border-2 ${
                          selectedPayment === 'online'
                              ? 'border-blue-500 bg-blue-500'
                              : 'border-gray-300'
                      }`}>
                        {selectedPayment === 'online' && (
                            <View className="w-full h-full rounded-full bg-blue-500 items-center justify-center">
                              <View className="w-2 h-2 bg-white rounded-full" />
                            </View>
                        )}
                      </View>
                    </View>
                  </Pressable>
                </View>

                {/* Action Buttons */}
                <View className="mt-6 border-t border-gray-200 pt-6">
                  <TouchableOpacity
                      onPress={payNow}
                      disabled={loading}
                      className={`w-full bg-black py-4 rounded-lg mb-3 ${loading ? 'opacity-50' : ''}`}
                  >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text className="text-white text-center font-semibold text-lg">Proceed</Text>
                    )}
                  </TouchableOpacity>

                  <TouchableOpacity
                      className="w-full bg-red-500 py-4 rounded-lg"
                      onPress={() => setShowSummaryModal(false)}
                  >
                    <Text className="text-white text-center font-semibold text-lg">Cancel Ride</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>

        {/* Ride Request Modal */}
        <Modal
            visible={showRideRequest}
            animationType="slide"
            transparent
            onRequestClose={() => setShowRideRequest(false)}
        >
          {requestedRide.length > 0 && (
              <View className="flex-1 justify-center items-center bg-black/30">
                <View className="bg-gray-50 rounded-xl w-[90%] max-h-[85%] overflow-hidden">
                  {/* Header */}
                  <View className="bg-black text-white p-4 rounded-t-xl">
                    <Text className="text-2xl text-blue-100 font-bold text-center">Ride Request</Text>
                  </View>

                  {/* Scrollable Content */}
                  <ScrollView className="p-6 space-y-6" showsVerticalScrollIndicator={false}>
                    {/* Pickup & Destination */}
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
                        onPress={() => cancelRide(requestedRide[currentRideIndex])}
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

export default DashboardScreen