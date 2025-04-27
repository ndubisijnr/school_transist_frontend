// Available Dispatch Services (Image 3)
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, FlatList, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {style} from "@/src/hooks/styles";
import { AntDesign, Feather } from '@expo/vector-icons';

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
            <ScrollView style={[styles.container]}>
                <View style={styles.header}>
                    <Text style={styles.logoText}>SpeedyDis</Text>
                    <Text style={styles.logoSubtext}>'ogo</Text>
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
            </ScrollView>
        );
    };


    return (
        <>
            {showDispatch && (<SpeedyDispatch></SpeedyDispatch>)}
            {!showDispatch && (<ScrollView style={styles.container}>
                <Text style={styles.pageTitle}>Explore Interstate Logistics Company</Text>
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

                <Text style={styles.sectionTitle}>Dispatch Services</Text>

                <View style={styles.tabContainer}>
                    <TouchableOpacity
                        style={[styles.dispatchTab, activeTab === 'Pending' && styles.activeDispatchTab]}
                        onPress={() => setActiveTab('Pending')}>
                        <Text style={[styles.dispatchTabText, activeTab === 'Pending' && styles.activeDispatchTabText]}>Pending</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.dispatchTab, activeTab === 'Active' && styles.activeDispatchTab]}
                        onPress={() => setActiveTab('Active')}>
                        <Text style={styles.dispatchTabText}>Active</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.dispatchTab, activeTab === 'Completed' && styles.activeDispatchTab]}
                        onPress={() => setActiveTab('Completed')}>
                        <Text style={styles.dispatchTabText}>Completed</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.dispatchTab, activeTab === 'All' && styles.activeDispatchTab]}
                        onPress={() => setActiveTab('All')}>
                        <Text style={styles.dispatchTabText}>All</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.emptyStateContainer}>
                    <View style={styles.receiptIconContainer}>
                        <Ionicons name="receipt-outline" size={40} color="#333" />
                    </View>
                    {/* <Text style={styles.emptyStateTitle}>
                        All your payments and purchases in one place
                    </Text> */}
                    <Text style={styles.emptyStateDescription}>
                        Keep track and manage dispatch activity right here. Let's get started.
                    </Text>
                </View>

                {/*<View style={styles.dispatchItemCard}>*/}
                {/*    <View style={styles.dispatchItemInfo}>*/}
                {/*        <Text style={styles.dispatchCustomerName}>John Doe</Text>*/}
                {/*        <Text style={styles.dispatchLocation}>Lagos</Text>*/}
                {/*        <Text style={styles.dispatchPhone}>+2341234567890</Text>*/}
                {/*    </View>*/}
                {/*    <View style={styles.dispatchStatusContainer}>*/}
                {/*        <Text style={styles.dispatchStatusPending}>Pending</Text>*/}
                {/*    </View>*/}
                {/*    <View style={styles.dispatchActionContainer}>*/}
                {/*        <TouchableOpacity style={styles.detailsButton}>*/}
                {/*            <Text style={styles.detailsButtonText}>Details</Text>*/}
                {/*        </TouchableOpacity>*/}
                {/*        <TouchableOpacity style={styles.approveButton}>*/}
                {/*            <Text style={styles.approveButtonText}>Approve</Text>*/}
                {/*        </TouchableOpacity>*/}
                {/*    </View>*/}
                {/*</View>*/}

            </ScrollView>)}
        </>

    );
};

const styles = StyleSheet.create({...style})


export  default  Dispatch





