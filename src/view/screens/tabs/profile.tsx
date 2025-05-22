
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    StatusBar,
    Image,
    Platform, Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {ContainerScrollViewLayout} from "@/view/layout/ContainerScrollViewLayout";
import {useDispatch, useSelector, useStore} from "react-redux";
import {RootState} from "@/store";
import {RouterUtil} from "@/utility/RouterUtil";
import auth from "@/store/modules/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {persistStore} from "redux-persist";

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


const ProfileScreen = () => {
    const [activeTab, setActiveTab] = useState('Activity');
    const [isEditing, setIsEditing] = useState(false);
    const {userDetails} = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch();
    const store = useStore();
    const persistor = persistStore(store);
    // Toggle edit mode
    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };
    const renderTabContent = () => {
        if (activeTab === 'Activity') {
            return (
                <View style={styles.emptyStateContainer}>
                    <View style={styles.receiptIconContainer}>
                        <Ionicons name="receipt-outline" size={40} color="#333" />
                    </View>
                    {/* <Text style={styles.emptyStateTitle}>
                        All your payments and purchases in one place
                    </Text> */}
                    <Text style={styles.emptyStateDescription}>
                        Keep track of everything you do with AzaPal right here. Let's get started.
                    </Text>
                </View>
            );
        } else {
            return (
                <View style={styles.emptyStateContainer}>
                    <Text style={styles.emptyStateTitle}>Wallet Content</Text>
                </View>
            );
        }
    };

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

    return (
        <ContainerScrollViewLayout>
            <View className={"flex-row justify-between items-center mt-5 pb-2 mx-5"}>
                <View className={"flex-1 items-center"}>
                    <Ionicons name="person-circle" size={70} color="#999" />
                    <Text className="text-lg">{userDetails?.student?.full_name ? userDetails?.student?.full_name : userDetails?.hub?.full_name}</Text>
                    <View className="flex-row items-center gap-2 mt-1">
                        <Text className="text-sm bg-black/20 p-1">{userDetails?.student?.full_name ? 'Student' : 'Driver'}</Text>
                        <Text className="text-md"> at</Text>
                        <Text className="text-sm bg-orange-200 p-1"> {userDetails?.uni?.name}</Text>

                    </View>
                    {/* <Image width={124} height={124} className={"rounded-full w-[124px] h-[124px]"} source={pf} /> */}
                </View>
                {/*<View className={"flex-1 items-end"}>*/}
                {/*    <Ionicons*/}
                {/*        name={isEditing ? "close-outline" : "create-outline"}*/}
                {/*        size={28}*/}
                {/*        color="#333"*/}
                {/*        onPress={toggleEdit}*/}
                {/*    />*/}
                {/*</View>*/}
            </View>


            <View className="p-5">
                <MenuSection title="Profile and support">
                    <MenuItem
                        icon={<Ionicons name="person-outline" size={18} color="#333" />}
                        title="Your Profile"
                    />
                    <MenuItem
                        icon={<Ionicons name="call-outline" size={18} color="#333" />}
                        title="Customer Support"
                    />

                    <TouchableOpacity style={styles.menuItem} onPress={() => handleLogout()}>
                        <View style={styles.iconContainer}>
                            {/* Ensure icon is a component, not a string */}
                            <Ionicons name="exit-outline" size={18} color="#333" />
                        </View>
                        <Text style={styles.menuItemText}>Log out</Text>
                    </TouchableOpacity>

                </MenuSection>
            </View>
        </ContainerScrollViewLayout>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0

    },
    tabsContainer: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    tabButton: {
        paddingVertical: 14,
        marginRight: 24,
        position: 'relative',
    },
    tabText: {
        fontSize: 16,
        fontWeight: '500',
    },
    activeTabText: {
        color: '#000',
        fontWeight: '600',
    },
    inactiveTabText: {
        color: '#888',
    },
    activeTabIndicator: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 2,
        backgroundColor: '#000',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyStateContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 40,
    },
    receiptIconContainer: {
        width: 60,
        height: 60,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#333',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        position: 'relative',
    },
    emptyStateTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 12,
        color: '#222',
    },
    emptyStateDescription: {
        fontSize: 14,
        textAlign: 'center',
        color: '#666',
        lineHeight: 20,
    },
    bottomNavBar: {
        flexDirection: 'row',
        backgroundColor: 'white',
        paddingTop: 8,
        paddingBottom: 8,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    navItem: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 8,
    },
    activeNavItem: {
        borderBottomColor: '#000',
    },
    navLabel: {
        marginTop: 4,
        fontSize: 12,
        color: '#888',
    },
    activeNavLabel: {
        marginTop: 4,
        fontSize: 12,
        color: '#000',
        fontWeight: '500',
    },
    navIndicatorContainer: {
        height: 4,
        backgroundColor: 'white',
        position: 'relative',
    },
    navIndicator: {
        position: 'absolute',
        right: '16.7%',
        width: '16.7%',
        height: 4,
        backgroundColor: '#333',
        borderRadius: 2,
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

export default ProfileScreen