import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    Image
} from 'react-native';
import {Feather} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
import {RouterUtil} from "@/utility/RouterUtil";

const SellerRegistrationScreen = ({handleOnClick}) => {
    const [businessName, setBusinessName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [website, setWebsite] = useState('');
    const navigation = useNavigation();


    const handleRegister = () => {
        // Handle registration logic here
        console.log({
            businessName,
            phoneNumber,
            description,
            address,
            website
        });

        RouterUtil.navigate('dashboard.businessDashboardScreen')
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>

                {/* Main Content */}
                <View style={styles.content}>
                    <Text style={styles.title}>Seller Registration</Text>

                    {/* Back to selection link */}
                    <TouchableOpacity
                        style={styles.backLink}
                        onPress={handleOnClick}
                    >
                        <Feather name="arrow-left" size={24} color="black" />
                        <Text style={styles.backLinkText}>Back to selection</Text>
                    </TouchableOpacity>

                    {/* Form Fields */}
                    <View style={styles.formContainer}>
                        {/* Business Name */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Business name</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter business name"
                                value={businessName}
                                onChangeText={setBusinessName}
                            />
                        </View>

                        {/* Phone Number */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Phone number</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter phone number with country code (e.g. +1234567890)"
                                value={phoneNumber}
                                onChangeText={setPhoneNumber}
                                keyboardType="phone-pad"
                            />
                            <Text style={styles.inputHelper}>
                                Provide a phone number we can reach your business with
                            </Text>
                        </View>

                        {/* Description */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Description</Text>
                            <TextInput
                                style={[styles.input, styles.textArea]}
                                placeholder="Describe your business"
                                value={description}
                                onChangeText={setDescription}
                                multiline
                                numberOfLines={4}
                            />
                        </View>

                        {/* Address */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Address</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter business address"
                                value={address}
                                onChangeText={setAddress}
                            />
                        </View>

                        {/* Website */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Website</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="https://yourwebsite.com"
                                value={website}
                                onChangeText={setWebsite}
                                keyboardType="url"
                            />
                        </View>

                        {/* Register Button */}
                        <TouchableOpacity
                            style={styles.registerButton}
                            onPress={handleRegister}
                        >
                            <Text style={styles.registerButtonText}>Register Business</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    backButton: {
        padding: 8,
    },
    backIcon: {
        width: 24,
        height: 24,
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
    userIconContainer: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'purple',
        alignItems: 'center',
        justifyContent: 'center',
    },
    userIcon: {
        color: 'white',
        fontWeight: 'bold',
    },
    content: {
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    backLink: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    backLinkIcon: {
        width: 16,
        height: 16,
        marginRight: 8,
        tintColor: '#1a73e8',
    },
    backLinkText: {
        color: '#1a73e8',
        fontSize: 14,
    },
    formContainer: {
        width: '100%',
    },
    inputGroup: {
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 8,
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 4,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 16,
        color: '#333',
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    inputHelper: {
        fontSize: 12,
        color: '#757575',
        marginTop: 4,
    },
    registerButton: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#333',
        borderRadius: 4,
        paddingVertical: 12,
        alignItems: 'center',
        marginTop: 16,
    },
    registerButtonText: {
        color: '#333',
        fontSize: 16,
        fontWeight: '500',
    },
});

export default SellerRegistrationScreen;