import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, SafeAreaView, Pressable, Alert, TouchableOpacity, Image, StatusBar, Platform, ScrollView } from 'react-native';
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
  }

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