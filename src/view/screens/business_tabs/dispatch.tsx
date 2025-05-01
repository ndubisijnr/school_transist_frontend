// Available Dispatch Services (Image 3)
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, FlatList, Linking, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {style} from "@/utility/hook/styles";
import { AntDesign, Feather } from '@expo/vector-icons';
import {RouterUtil} from "@/utility/RouterUtil";

const Dispatch = () => {
    const [activeTab, setActiveTab] = useState('Pending');
    const [showDispatch, setShowDispatch] = useState(false);


    const SpeedyDispatch = () => {
        const handleSubscribe = () => {
            console.log('Subscribed to company');
        };

        const handleCall = (phoneNumber) => {
            Linking.openURL(`tel:${phoneNumber}`);
        };

        const branches = [
            {
                name: 'Ajah',
                manager: 'Michael Johnson',
                phone: '08033035979'
            },
            {
                name: 'Iyanapaja',
                manager: 'Sarah Williams',
                phone: '09033035979'
            },
            {
                name: 'Begger',
                manager: 'Carlos Rodriguez',
                phone: '07033035979'
            }
        ];

        const locations = [
            'Lagos', 'Abuja', 'Enugu', 'Imo',
            'Jos', 'Asaba', 'Benin', 'Oyo', 'Lokoja'
        ];

        const features = [
            'Temperature-controlled transport options',
            'Insurance coverage up to $10,000 per package',
            'Same-day delivery options in select areas',
            'Specialized handling for fragile items'
        ];

        return (
            <ScrollView >
                <View style={styles.header}>
                    <Text style={styles.logoText}>GUO</Text>
                    <Text style={styles.logoSubtext}>'logo</Text>
                    <TouchableOpacity style={styles.closeIcon} onPress={() => setShowDispatch(false)}>
                        <AntDesign name="close" size={24} color="black"  />
                    </TouchableOpacity>
                </View>

                <View style={styles.titleSection}>
                    <Text style={styles.companyName}>GUO</Text>
                    <Text style={styles.tagline}>"Your Packages, Our Priority"</Text>
                </View>

                <View style={styles.ratingSection}>
                    <Text style={styles.rateText}>Rate this company:</Text>
                    <View style={styles.starContainer}>
                        {[1, 2, 3, 4].map((item) => (
                            <AntDesign key={`star-filled-${item}`} name="star" size={20} color="#FFD700" />
                        ))}
                        <AntDesign name="staro" size={20} color="#FFD700" />
                    </View>
                    <Text style={styles.communityRating}>Community rating: 4.8</Text>

                    <View style={styles.likesContainer}>
                        <View style={styles.likeCounter}>
                            <AntDesign name="like1" size={18} color="#555" />
                            <Text style={styles.counterText}>243</Text>
                        </View>
                        <View style={styles.likeCounter}>
                            <AntDesign name="dislike1" size={18} color="#555" />
                            <Text style={styles.counterText}>18</Text>
                        </View>
                    </View>

                    {/*<TouchableOpacity style={styles.subscribeButton} onPress={handleSubscribe}>*/}
                    {/*    <Text style={styles.subscribeButtonText}>Subscribe</Text>*/}
                    {/*</TouchableOpacity>*/}
                </View>
        <View >

                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Branches</Text>
                    <View style={styles.divider} />

                    {branches.map((branch, index) => (
                        <View key={index} style={styles.branchItem}>
                            <View style={styles.branchInfo}>
                                <Text style={styles.branchName}>{branch.name}</Text>
                                <Text style={styles.branchManager}>Manager: {branch.manager}</Text>
                                <TouchableOpacity
                                    style={styles.phoneContainer}
                                    onPress={() => handleCall(branch.phone.replace(/[()-\s]/g, ''))}
                                >
                                    <Feather name="phone" size={16} color="#555" />
                                    <Text style={styles.phoneText}>{branch.phone}</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={styles.branchSubscribe} onPress={handleSubscribe}>
                                <Text style={styles.branchSubscribeText}>Subscribe</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>

                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Delivery Coverage</Text>
                    <View style={styles.divider} />
                    <View style={styles.locationsContainer}>
                        {locations.map((location, index) => (
                            <View key={index} style={styles.locationItem}>
                                <Text style={styles.locationText}>{location}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>About</Text>
                    <View style={styles.divider} />
                    <Text style={styles.aboutText}>
                        SpeedyDispatch is a leading logistics and dispatch service with over 15 years of experience. We specialize
                        in fast, reliable deliveries for businesses and individuals across the Eastern United States.
                    </Text>
                </View>

                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Features</Text>
                    <View style={styles.divider} />
                    <View style={styles.featuresList}>
                        {features.map((feature, index) => (
                            <View key={index} style={styles.featureItem}>
                                <View style={styles.bulletPoint} />
                                <Text style={styles.featureText}>{feature}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </View>
            </ScrollView>
        );
    };


    return (
        <>
            {!showDispatch && (

                <View className="mb-5">
                    <View className="flex-row items-center justify-between">
                        <Text  className="text-sm" style={styles.pageTitle}>Explore Logistics</Text>
                        {/*<TouchableOpacity>*/}
                        {/*    <Text  className="text-sm underline text-blue-500" style={styles.pageTitle}> More</Text>*/}
                        {/*</TouchableOpacity>*/}
                    </View>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 5 }}
                    >
                        <View style={styles.servicesContainer}>
                            <TouchableOpacity style={styles.serviceCard} onPress={() => setShowDispatch(true)}>
                                <View style={styles.serviceLogoContainer}>
                                    <Text style={styles.serviceLogo}>SpeedyDispatch Logo</Text>
                                </View>
                                <View style={styles.serviceNearTag}>
                                    <Text style={styles.serviceNearText}>Near You</Text>
                                </View>
                                <Text style={styles.serviceName}>GUO</Text>
                                <View style={styles.serviceRating}>
                                    <Ionicons name="star" size={16} color="#FFD700" />
                                    <Ionicons name="star" size={16} color="#FFD700" />
                                    <Ionicons name="star" size={16} color="#FFD700" />
                                    <Ionicons name="star" size={16} color="#FFD700" />
                                    <Ionicons name="star-outline" size={16} color="#FFD700" />
                                    <Text style={styles.ratingValue}>4.8</Text>
                                </View>
                            </TouchableOpacity>

                            <View style={styles.serviceCard}>
                                <View style={styles.serviceLogoContainer}>
                                    <Text style={styles.serviceLogo}>Premier Logistics Logo</Text>
                                </View>
                                <Text style={styles.serviceName}>GIGM</Text>
                                <View style={styles.serviceRating}>
                                    <Ionicons name="star" size={16} color="#FFD700" />
                                    <Ionicons name="star" size={16} color="#FFD700" />
                                    <Ionicons name="star" size={16} color="#FFD700" />
                                    <Ionicons name="star" size={16} color="#FFD700" />
                                    <Ionicons name="star-outline" size={16} color="#FFD700" />
                                    <Text style={styles.ratingValue}>4.6</Text>
                                </View>
                            </View>

                            <View style={styles.serviceCard}>
                        <View style={styles.serviceLogoContainer}>
                            <Text style={styles.serviceLogo}>WestCoast Express Logo</Text>
                        </View>
                        <View style={styles.serviceNearTag}>
                            <Text style={styles.serviceNearText}>Near You</Text>
                        </View>
                        <Text style={styles.serviceName}>WestCoast Express</Text>
                        <View style={styles.serviceRating}>
                            <Ionicons name="star" size={16} color="#FFD700" />
                            <Ionicons name="star" size={16} color="#FFD700" />
                            <Ionicons name="star" size={16} color="#FFD700" />
                            <Ionicons name="star" size={16} color="#FFD700" />
                            <Ionicons name="star-outline" size={16} color="#FFD700" />
                            <Text style={styles.ratingValue}>4.9</Text>
                        </View>
                    </View>
                        </View>
                    </ScrollView>
                </View>



            )}

            <Modal visible={showDispatch}  animationType="slide"
                   presentationStyle="pageSheet">
                <SpeedyDispatch></SpeedyDispatch>
            </Modal>
        </>

    );
};

const styles = StyleSheet.create({...style,
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
    },})


export  default  Dispatch





