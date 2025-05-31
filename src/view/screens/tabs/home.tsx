import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, SafeAreaView, Pressable, Alert, TouchableOpacity, Modal, Image, StatusBar, Platform, ScrollView } from 'react-native';
import {Ionicons, FontAwesome6, Feather} from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { RootState } from "@/store";
import {useRouter} from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {RouterUtil} from "@/utility/RouterUtil";
import {persistStore} from "redux-persist";
import {useStore} from "react-redux";
import auth from '@/store/modules/auth'
import {useDispatch} from "react-redux";
import Dispatch from "@/view/screens/business_tabs/dispatch";
import {ContainerScrollViewLayout, ContainerScrollViewLayoutProps} from "@/view/layout/ContainerScrollViewLayout";
import {DefaultTextInput} from "@/component/textInput/DefaultTextInput";
import app from "@/store/modules/app";
import MapComponent from "@/component/mapComponent";
import Select from "@/component/select/Select";
import {ResponseUtil} from "@/utility/ResponseUtil";
import {CreditCard, Wallet} from "lucide-react";

const MenuItem = ({ icon, title }: any) => (

  <TouchableOpacity style={styles.menuItem}>
    <View style={styles.iconContainer}>
      {/* Ensure icon is a component, not a string */}
      {icon}
    </View>
    <Text style={styles.menuItemText}>{title}</Text>
  </TouchableOpacity>
);

const MenuSection = ({ title, children }: any) => (
  <View style={styles.menuSection}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.sectionContent}>
      {children}
    </View>
  </View>
);


const DashboardScreen = () => {
  const [showMenu, setShowMenu] = useState(false)
  const {userDetails} = useSelector((state: RootState) => state.auth)
  const {locations} = useSelector((state: RootState) => state.app)
  const dispatch = useDispatch();
  const router = useRouter();
  const store = useStore();
  const persistor = persistStore(store);
  const [showFrom, setShowFrom] = useState(false);
  const [selectedToValue, setSelectedToValue] = useState(null);
  const [selectedFromValue, setSelectedFromValue] = useState(null);
  const [showTo, setShowTo] = useState(false);
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState('online');
  const [walletBalance] = useState(1250.00);

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

  const updateDriversLocation = () => {
    ResponseUtil.toast('Location updated successfully', 'success');
  }

  const handleBookRide = () => {
    ResponseUtil.toast('Requesting ride', 'success');
    setShowSummaryModal(true)
  }

  const handlePaymentSelect = (method) => {
    console.log(method)
    setSelectedPayment(method);
  };

  const handleDriverSelect = (driver) => {
    alert(`Booking ride with ${driver.name}. ETA: ${driver.eta}`);
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
              {userDetails?.student ?
                  <View className="mt-3 ">
                    <Select
                        label="Select Your destination"
                        options={fromOptions}
                        value={selectedFromValue}
                        onValueChange={setSelectedFromValue}
                        placeholder="from"
                        searchable={true}
                        searchPlaceholder="Select Your destination..."
                    />
                    <Select
                        label="Select Your destination"
                        options={toOptions}
                        value={selectedToValue}
                        onValueChange={setSelectedToValue}
                        placeholder="to"
                        searchable={true}
                        searchPlaceholder="Select Your destination..."
                    />

                    <View>
                      <TouchableOpacity className="bg-[#222] p-3 rounded-[18px]" onPress={() =>  handleBookRide()}>
                        <Text className="text-white text-center">Request Ride</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  :
                  <View className="mt-3">
                    <Select
                        label="Update your current location"
                        options={toOptions}
                        value={selectedToValue}
                        onValueChange={setSelectedToValue}
                        placeholder="to"
                        searchable={true}
                        searchPlaceholder="Update your current location..."
                    />

                    <View>
                      <TouchableOpacity className="bg-[#222] p-3 rounded-[18px]" onPress={() => updateDriversLocation()}>
                        <Text className="text-white text-center">Proceed</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

              }
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
                        <p className="text-red-500 text-sm mt-2">Insufficient balance</p>
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
                <TouchableOpacity
                    className="w-full bg-black py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors"
                >
                  <Text className="text-white text-center"> Proceed </Text>
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