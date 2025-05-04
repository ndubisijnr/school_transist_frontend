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
  const authState = useSelector((state: RootState) => state.auth)
  const user = authState?.userDetails
  const dispatch = useDispatch();
  const router = useRouter();
  const store = useStore();
  const persistor = persistStore(store);

  const userLocation = authState.location

  const handleLogout = async () => {
    try {
      // Show confirmation dialog
      Alert.alert(
          "Logout",
          "Are you sure you want to logout?",
          [
            {
              text: "Cancel",
              style: "cancel"
            },
            {
              text: "Logout",
              onPress: async () => {
                // 1. Dispatch logout action
                dispatch(auth.mutation.logout());

                // 2. Purge the persistor to clear persisted Redux state
                await persistor.purge();

                // 3. Clear any auth-related items from AsyncStorage
                await AsyncStorage.multiRemove(['authToken', 'userId', 'userCredentials']);
                // 4. Navigate user back to login screen
                RouterUtil.replace('auth.login'); // Adjust to your actual login route name
              }
            }
          ]
      );
    } catch (error) {
      console.error("Logout failed:", error);
      Alert.alert("Error", "Failed to logout. Please try again.");
    }
  };

  const AzapalMenu = () => {
    return <>
      <ScrollView style={styles.content}>

        {/* Send and business_tabs */}
        <MenuSection title="Money and Business">
          <TouchableOpacity onPress={() => RouterUtil.navigate('dashboard.sendMoneyScreen')} style={styles.menuItem}>
            <View style={styles.iconContainer}>
              {/* Ensure icon is a component, not a string */}
              <Ionicons name="paper-plane-outline" size={18} color="#333" />
            </View>
            <Text style={styles.menuItemText}>Send to a Azapal Business account</Text>
          </TouchableOpacity>

          <TouchableOpacity  onPress={() => RouterUtil.navigate('dashboard.createBusinessScreen')} style={styles.menuItem}>
            <View style={styles.iconContainer}>
              {/* Ensure icon is a component, not a string */}
              <Ionicons name="document-text-outline" size={18} color="#333" />
            </View>
            <Text style={styles.menuItemText}>Create A Business</Text>
          </TouchableOpacity>
        </MenuSection>

        <Dispatch />
        {/* Profile and support */}
        <MenuSection title="Profile and support">
          <MenuItem
            icon={<Ionicons name="person-outline" size={18} color="#333" />}
            title="Your Profile"
          />
          <MenuItem
            icon={<Ionicons name="call-outline" size={18} color="#333" />}
            title="Customer Support"
          />

          <TouchableOpacity  onPress={() => handleLogout()} style={styles.menuItem}>
            <View style={styles.iconContainer}>
              {/* Ensure icon is a component, not a string */}
              <Ionicons name="exit-outline" size={18} color="#333" />
            </View>
            <Text style={styles.menuItemText}>Log out</Text>
          </TouchableOpacity>

        </MenuSection>
      </ScrollView>


    </>

  }


  return( <>
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" translucent={true} />

      <>
        <View style={styles.header}>
          <TouchableOpacity style={styles.locationContainer}  onPress={() => setShowMenu(true)}>
            <Ionicons name="location-outline" size={20} color="#3B3B3B" />
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.locationText}>
              {userLocation?.address || 'Somewhere in africa' }
            </Text>
          </TouchableOpacity>
          <View style={styles.profileContainer}>
            <View style={styles.profileIcon}>
              <Text style={styles.profileLetter}>N</Text>
            </View>
            {/*<Feather name="chevron-down" size={20} color="black" />*/}
          </View>
          {/*<View style={styles.profileContainer}>*/}
          {/*  <Image*/}
          {/*    source={{ uri: 'https://randomuser.me/api/portraits/women/32.jpg' }}*/}
          {/*    style={styles.profileImage}*/}
          {/*  />*/}
          {/*  <View style={styles.notificationBadge}>*/}
          {/*    <Text style={styles.notificationText}>1</Text>*/}
          {/*  </View>*/}
          {/*</View>*/}
        </View>

        <View style={styles.content}>
          <TouchableOpacity style={styles.card}>
            <View style={[styles.progressContainer, { backgroundColor: '#F15A24', borderRadius: 12, padding: 15, }]}>
              <View style={styles.progressInfo}>
                <Text style={styles.progressTitle}>Set up your account</Text>
                <Text style={styles.progressSubtitle}>A few more steps left.</Text>
              </View>
              <View style={styles.progressCircleContainer}>
                <View style={styles.progressCircle}>
                  {/*<View style={styles.progressFill} />*/}
                  <View style={styles.progressCenter} />
                  <Text style={styles.progressText}>0/3</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
          <AzapalMenu />
        </View>
      </>

    </SafeAreaView>
  </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    paddingHorizontal:16,
    paddingVertical:16

  },
  locationContainer: {
    flexDirection: 'row',

    alignItems: 'center',
    width:'70%',
  },
  locationText: {
    fontSize: 13,
    color: '#FA4C4C',
    marginLeft: 4,
    marginRight: 2,
    flex: 1
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-center',
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