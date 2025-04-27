// Business Dashboard (Image 4)
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {style} from "@/src/hooks/styles";
import TransactionCard from "@/src/components/cards/TransactionCard";

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('New Payments');
// Sample data for three transactions
    const SAMPLE_TRANSACTIONS = [
        {
            id: 'tx1',
            paymentAmount: 5000,
            vendor: 'ABND',
            date: 'April 21, 2025',
            status: 'CONFIRMED',
            steps: [
                { name: 'Money Sent', status: 'COMPLETED', date: 'April 21', details: 'Transaction completed', checkmarks: 2 },
                { name: 'Money Received', status: 'COMPLETED', date: 'April 22', details: 'Vendor confirmed', checkmarks: 2 },
                { name: 'Dispatch Contacted', status: 'COMPLETED', date: 'April 22', details: 'Vendor reached out to logistics', checkmarks: 1 },
                { name: 'Package Collected', status: 'COMPLETED', date: 'April 23', details: 'Picked up from vendor location', checkmarks: 1 },
                { name: 'Package In Transit', status: 'ACTIVE', date: 'April 25', details: 'Expected arrival on April 25', checkmarks: 0 },
                { name: 'Package Arrival at Terminal', status: 'PENDING', date: 'Pending', details: 'Awaiting arrival confirmation', checkmarks: 0 },
            ]
        },
        {
            id: 'tx2',
            paymentAmount: 2750,
            vendor: 'Global Supplies',
            date: 'April 18, 2025',
            status: 'DELIVERED',
            steps: [
                { name: 'Money Sent', status: 'COMPLETED', date: 'April 18', details: 'Transaction completed', checkmarks: 2 },
                { name: 'Money Received', status: 'COMPLETED', date: 'April 19', details: 'Vendor confirmed', checkmarks: 2 },
                { name: 'Dispatch Contacted', status: 'COMPLETED', date: 'April 19', details: 'Vendor reached out to logistics', checkmarks: 1 },
                { name: 'Package Collected', status: 'COMPLETED', date: 'April 20', details: 'Picked up from vendor location', checkmarks: 1 },
                { name: 'Package In Transit', status: 'COMPLETED', date: 'April 20-22', details: 'In transit to destination', checkmarks: 1 },
                { name: 'Package Arrival at Terminal', status: 'COMPLETED', date: 'April 22', details: 'Successfully delivered', checkmarks: 2 },
            ]
        },
        {
            id: 'tx3',
            paymentAmount: 8250,
            vendor: 'Tech Innovations',
            date: 'April 23, 2025',
            status: 'PROCESSING',
            steps: [
                { name: 'Money Sent', status: 'COMPLETED', date: 'April 23', details: 'Transaction completed', checkmarks: 2 },
                { name: 'Money Received', status: 'COMPLETED', date: 'April 23', details: 'Vendor confirmed', checkmarks: 1 },
                { name: 'Dispatch Contacted', status: 'ACTIVE', date: 'In Progress', details: 'Awaiting dispatch confirmation', checkmarks: 0 },
                { name: 'Package Collection', status: 'PENDING', date: 'Scheduled', details: 'Scheduled for April 24', checkmarks: 0 },
                { name: 'Package In Transit', status: 'PENDING', date: 'Pending', details: 'Not yet in transit', checkmarks: 0 },
                { name: 'Package Arrival at Terminal', status: 'PENDING', date: 'Pending', details: 'Estimated April 27', checkmarks: 0 },
            ]
        }
    ];

    return (
        <ScrollView style={styles.container}>
            <View style={styles.businessHeader}>
                <View style={styles.businessLogoContainer}>
                    <Text style={styles.businessLogo}>Business Logo</Text>
                </View>
                <Text style={styles.businessName}>Zita Gliters</Text>
                <View style={styles.balanceContainer}>
                    <Text style={styles.balanceAmount}>₦0.00</Text>
                </View>
            </View>

            {/*<View style={styles.paymentTabContainer}>*/}
            {/*    <TouchableOpacity*/}
            {/*        style={[styles.paymentTab, activeTab === 'New Payments' && styles.activePaymentTab]}*/}
            {/*        onPress={() => setActiveTab('New Payments')}>*/}
            {/*        <Text style={[styles.paymentTabText, activeTab === 'New Payments' && styles.activePaymentTabText]}>New Payments</Text>*/}
            {/*    </TouchableOpacity>*/}
            {/*    <TouchableOpacity*/}
            {/*        style={[styles.paymentTab, activeTab === 'Ongoing' && styles.activePaymentTab]}*/}
            {/*        onPress={() => setActiveTab('Ongoing')}>*/}
            {/*        <Text style={styles.paymentTabText}>Ongoing</Text>*/}
            {/*    </TouchableOpacity>*/}
            {/*    <TouchableOpacity*/}
            {/*        style={[styles.paymentTab, activeTab === 'Completed' && styles.activePaymentTab]}*/}
            {/*        onPress={() => setActiveTab('Completed')}>*/}
            {/*        <Text style={styles.paymentTabText}>Completed</Text>*/}
            {/*    </TouchableOpacity>*/}
            {/*</View>*/}
            <TransactionCard />

            <View style={styles.emptyStateContainer}>
                {/*<View style={styles.receiptIconContainer}>*/}
                {/*    <Ionicons name="receipt-outline" size={40} color="#333" />*/}
                {/*</View>*/}
                {/* <Text style={styles.emptyStateTitle}>
                        All your payments and purchases in one place
                    </Text> */}
                {/*<Text style={styles.emptyStateDescription}>*/}
                {/*    Keep track and manage payments made to your  AzaPal business account right here. Let's get started.*/}
                {/*</Text>*/}

            </View>

            {/*<View style={styles.transactionSummaryCard}>*/}
            {/*    <View style={styles.transactionSummaryContent}>*/}
            {/*        <Text style={styles.transactionSummaryLabel}>Successful Transactions</Text>*/}
            {/*    </View>*/}
            {/*    <View style={styles.transactionSuccessIcon}>*/}
            {/*        <Ionicons name="checkmark-circle" size={24} color="#34A853" />*/}
            {/*    </View>*/}
            {/*</View>*/}

            {/*<View style={styles.transactionSummaryCard}>*/}
            {/*    <View style={styles.transactionSummaryContent}>*/}
            {/*        <Text style={styles.transactionSummaryLabel}>Failed Transactions</Text>*/}
            {/*    </View>*/}
            {/*    <View style={styles.transactionFailedIcon}>*/}
            {/*        <Ionicons name="close-circle" size={24} color="#EA4335" />*/}
            {/*    </View>*/}
            {/*</View>*/}
        </ScrollView>
    );
};


const styles = StyleSheet.create({...style})

export default Dashboard