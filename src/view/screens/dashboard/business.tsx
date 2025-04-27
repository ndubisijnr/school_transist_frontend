import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import {useNavigation} from "@react-navigation/native";
import {useRouter} from "expo-router";
const BusinessRegistrationScreen = () => {

    const navigation = useNavigation();
    const router = useRouter();
    function handleNavigate() {
        router.navigate('/(business_tabs)/dashboard');
    }
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton}>
                    <Feather name="arrow-left" size={24} color="black"  onPress={() => navigation.goBack()} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>BUSINESS</Text>
                <View style={styles.profileContainer}>
                    <View style={styles.profileIcon}>
                        <Text style={styles.profileLetter}>N</Text>
                    </View>
                    {/*<Feather name="chevron-down" size={20} color="black" />*/}
                </View>
            </View>

            {/*<View style={styles.divider} />*/}

            {/* Main Content */}
            <View style={styles.content}>
                <Text style={styles.title}>What type of business are you registering?</Text>

                {/* Service Provider Option */}
                <TouchableOpacity style={styles.optionCard} onPress={() => handleNavigate()}>
                    <View style={styles.iconContainer}>
                        <MaterialIcons name="people" size={28} color="#FF5722" />
                    </View>
                    <Text style={styles.optionTitle}>Service Provider</Text>
                    <Text style={styles.optionDescription}>Register as a product or service seller</Text>
                </TouchableOpacity>

                {/* Logistics Option */}
                <TouchableOpacity style={styles.optionCard}  onPress={() => handleNavigate()}>
                    <View style={styles.iconContainer}>
                        <Feather name="truck" size={28} color="#FF5722" />
                    </View>
                    <Text style={styles.optionTitle}>Logistics</Text>
                    <Text style={styles.optionDescription}>Register as a delivery or dispatch service</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
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