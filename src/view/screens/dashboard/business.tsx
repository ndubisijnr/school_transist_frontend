import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, Modal, Platform} from 'react-native';
import { Feather, MaterialIcons, Ionicons } from '@expo/vector-icons';
import {useNavigation} from "@react-navigation/native";
import {useRouter} from "expo-router";
import {RouterUtil} from "@/utility/RouterUtil";
import StudentRegistrationScreen from "@/view/screens/business_tabs/student-registration-screen";
import DriverRegistrationScreen from "@/view/screens/business_tabs/driver-registration-screen";
import {ContainerScrollViewLayout} from "@/view/layout/ContainerScrollViewLayout";
import app from "@/store/modules/app";
import {useAppDispatch, useAppSelector} from "@/store";

const BusinessRegistrationScreen = () => {
    const [userType, setUserType] = useState(null);
    const [showForm, setShowForm] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const navigation = useNavigation();

    function handleNavigate(value) {
        setUserType(value);
        setShowForm(true);
    }

    function handleFormClose(){
        setShowForm(false);
    }

    useEffect(() => {
        dispatch(app.action.readUnis({}))
    }, [dispatch]);
    return (
        <ContainerScrollViewLayout>

            <>
                <Modal
                    visible={showForm}
                    animationType="slide"
                    presentationStyle="pageSheet"
                    onRequestClose={() => setShowForm(false)}
                >
                    {userType === 'student' ?
                    <StudentRegistrationScreen handleOnClick={() => setShowForm(false)} />
                        :
                    <DriverRegistrationScreen handleOnClick={() => setShowForm(false)} />

                    }
                </Modal>

                <View style={styles.content}>
                    <Text style={styles.title}>Lets know who is using this app?</Text>

                    {/* Service Provider Option */}
                    <TouchableOpacity style={styles.optionCard} onPress={() => handleNavigate('student')}>
                        <View style={styles.iconContainer}>
                            <MaterialIcons name="people" size={28} color="#FF5722" />
                        </View>
                        <Text style={styles.optionTitle}>Student</Text>
                    </TouchableOpacity>

                    {/* Logistics Option */}
                    <TouchableOpacity style={styles.optionCard}  onPress={() => handleNavigate('driver')}>
                        <View style={styles.iconContainer}>
                            <Ionicons name="car" size={28} color="#FF5722" />
                        </View>
                        <Text style={styles.optionTitle}>Hub</Text>
                    </TouchableOpacity>
                </View>

            </>




        </ContainerScrollViewLayout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    backButton: {
        padding: 8,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
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
    divider: {
        height: 1,
        backgroundColor: '#E0E0E0',
    },
    content: {
        padding: 24,
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    optionCard: {
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 8,
        padding: 20,
        marginBottom: 20,
        alignItems: 'center',
    },
    iconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#FFF2E5',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    optionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    optionDescription: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
    },
});

export default BusinessRegistrationScreen;