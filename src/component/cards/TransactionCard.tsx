import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import {RouterUtil} from "@/utility/RouterUtil";

// Sample data for three transactions
const SAMPLE_TRANSACTIONS = [
    {
        id: 'tx1',
        paymentAmount: 5000,
        vendor: 'ABND',
        date: 'April 21, 2025',
        status: 'IN_TRANSIT',
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

// Status mapping for display
const STATUS_DISPLAY = {
    'IN_TRANSIT': 'IN TRANSIT',
    'DELIVERED': 'DELIVERED',
    'PROCESSING': 'PROCESSING'
};

// Status Badge Component
const StatusBadge = ({ status }) => {
    let bgColor, textColor;
    const displayStatus = STATUS_DISPLAY[status] || status;

    switch (status) {
        case 'DELIVERED':
            bgColor = '#E8F5E9';
            textColor = '#2E7D32';
            break;
        case 'IN_TRANSIT':
            bgColor = '#FFF3E0';
            textColor = '#E65100';
            break;
        case 'PROCESSING':
            bgColor = '#E3F2FD';
            textColor = '#1565C0';
            break;
        default:
            bgColor = '#F5F5F5';
            textColor = '#757575';
    }

    return (
        <View style={[styles.statusBadge, { backgroundColor: bgColor }]}>
            <Text style={[styles.statusText, { color: textColor }]}>{displayStatus}</Text>
        </View>
    );
};

// Step Indicator Component
const StepIndicator = ({ step, index }) => {
    let bgColor, textColor, icon;

    switch (step.status) {
        case 'COMPLETED':
            bgColor = '#4CAF50';
            textColor = '#FFFFFF';
            icon = 'check';
            break;
        case 'ACTIVE':
            bgColor = '#FFA000';
            textColor = '#FFFFFF';
            icon = 'sync';
            break;
        default:
            bgColor = '#E0E0E0';
            textColor = '#FFFFFF';
            icon = (index + 1).toString();
    }

    return (
        <View style={[styles.stepIndicator, { backgroundColor: bgColor }]}>
            {step.status === 'COMPLETED' ? (
                <FontAwesome name="check" size={14} color={textColor} />
            ) : step.status === 'ACTIVE' ? (
                <MaterialIcons name="sync" size={14} color={textColor} />
            ) : (
                <Text style={{ color: textColor, fontSize: 12, fontWeight: '600' }}>{index + 1}</Text>
            )}
        </View>
    );
};

// Checkmark Indicator Component
const CheckmarkIndicator = ({ count }) => {
    if (count === 0) return null;

    return (
        <View style={styles.checkmarkContainer}>
            <Text style={styles.checkmarkText}>
                {'✓'.repeat(count)}
            </Text>
        </View>
    );
};

// Transaction Card Component
const TransactionCard = ({ transaction }) => {
    const [showOrderProcess, setShowOrderProcess] = useState(false);

    return (
        <View style={styles.cardContainer}>
            {/* Payment Card */}
            <View style={styles.paymentCard}>
                <View style={styles.cardHeader}>
                    <Text style={styles.cardHeaderText}>Payment Received</Text>
                    <StatusBadge status={transaction.status} />
                </View>

                <View style={styles.paymentDetails}>
                    <View style={styles.paymentIcon}>
                        <Text style={styles.paymentIconText}>$</Text>
                    </View>

                    <View style={styles.paymentInfo}>
                        <Text style={styles.paymentTitle}>Vendor Payment</Text>
                        <Text style={styles.paymentSubtitle}>From {transaction.vendor} • {transaction.date}</Text>
                    </View>

                    <Text style={styles.paymentAmount}>${transaction.paymentAmount.toLocaleString()}</Text>
                </View>

                <TouchableOpacity
                    style={styles.toggleButton}
                    onPress={() => setShowOrderProcess(!showOrderProcess)}
                >
                    <Text style={styles.toggleButtonText}>
                        {showOrderProcess ? 'Hide Order Process' : 'Show Order Process'}
                    </Text>
                    <MaterialIcons
                        name={showOrderProcess ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                        size={20}
                        color="#1976D2"
                    />
                </TouchableOpacity>
            </View>

            {/* Order Process Card - Only shown when toggled */}
            {showOrderProcess && (
                <View style={styles.progressCard}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardHeaderText}>Order Progress</Text>
                        <StatusBadge status={transaction.status} />
                    </View>

                    <View style={styles.timeline}>
                        {transaction.steps.map((step, index) => (
                            <View key={index} style={styles.timelineStep}>
                                <View style={styles.timelineLeft}>
                                    <StepIndicator step={step} index={index} />
                                    {index < transaction.steps.length - 1 && (
                                        <View
                                            style={[
                                                styles.timelineConnector,
                                                { backgroundColor: step.status === 'COMPLETED' ? '#4CAF50' : '#E0E0E0' }
                                            ]}
                                        />
                                    )}
                                </View>

                                <View style={styles.stepDetails}>
                                    <Text style={styles.stepTitle}>{step.name}</Text>
                                    <Text style={styles.stepSubtitle}>{step.details}</Text>
                                </View>

                                <View style={styles.stepStatus}>
                                    <Text style={styles.stepDate}>{step.date}</Text>
                                    <CheckmarkIndicator count={step.checkmarks} />
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            )}
        </View>
    );
};

// Filter Button Component
const FilterButton = ({ title, active, onPress }) => {
    return (
        <TouchableOpacity
            style={[
                styles.filterButton,
                active ? styles.filterButtonActive : null
            ]}
            onPress={onPress}
        >
            <Text
                style={[
                    styles.filterButtonText,
                    active ? styles.filterButtonTextActive : null
                ]}
            >
                {title}
            </Text>
        </TouchableOpacity>
    );
};

// Main App Component
const TransactionTracker = () => {
    const [activeFilter, setActiveFilter] = useState('ALL');

    // Filter transactions based on active filter
    const filteredTransactions = SAMPLE_TRANSACTIONS.filter(transaction => {
        if (activeFilter === 'ALL') return true;
        return transaction.status === activeFilter;
    });

    return (
        <SafeAreaView style={styles.container}>
            {/*<View style={styles.header}>*/}
            {/*    <Text style={styles.headerTitle}>Business Transaction Flow</Text>*/}
            {/*</View>*/}

            <View style={styles.filterContainer}>
                <FilterButton
                    title="All"
                    active={activeFilter === 'ALL'}
                    onPress={() => setActiveFilter('ALL')}
                />
                <FilterButton
                    title="In Transit"
                    active={activeFilter === 'IN_TRANSIT'}
                    onPress={() => setActiveFilter('IN_TRANSIT')}
                />
                <FilterButton
                    title="Delivered"
                    active={activeFilter === 'DELIVERED'}
                    onPress={() => setActiveFilter('DELIVERED')}
                />
                <FilterButton
                    title="Processing"
                    active={activeFilter === 'PROCESSING'}
                    onPress={() => setActiveFilter('PROCESSING')}
                />
                <FilterButton
                    title="Analytics"
                    active={activeFilter === 'ANALYTICS'}
                    onPress={() => RouterUtil.navigate('dashboard.analyticsScreen')}
                />
            </View>

            <ScrollView style={styles.scrollView}>
                {filteredTransactions.length > 0 ? (
                    filteredTransactions.map(transaction => (
                        <TransactionCard key={transaction.id} transaction={transaction} />
                    ))
                ) : (
                    <View style={styles.emptyState}>
                        <MaterialIcons name="search-off" size={48} color="#BDBDBD" />
                        <Text style={styles.emptyStateText}>No transactions found</Text>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#F0F2F5',
    },
    header: {
        height: 60,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1E1E1E',
    },
    filterContainer: {
        flexDirection: 'row',
        padding: 12,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
    },
    filterButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        marginRight: 8,
        backgroundColor: '#F5F5F5',
    },
    filterButtonActive: {
        backgroundColor: '#1976D2',
    },
    filterButtonText: {
        fontSize: 12,
        fontWeight: '500',
        color: '#757575',
    },
    filterButtonTextActive: {
        color: '#FFFFFF',
    },
    scrollView: {
        flex: 1,
        padding: 16,
    },
    cardContainer: {
        marginBottom: 16,
    },
    paymentCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#F7F9FC',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
    },
    cardHeaderText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1E1E1E',
    },
    statusBadge: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '600',
    },
    paymentDetails: {
        flexDirection: 'row',
        padding: 16,
        alignItems: 'center',
    },
    paymentIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#BBDEFB',
        justifyContent: 'center',
        alignItems: 'center',
    },
    paymentIconText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1565C0',
    },
    paymentInfo: {
        flex: 1,
        marginLeft: 12,
    },
    paymentTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1E1E1E',
    },
    paymentSubtitle: {
        fontSize: 12,
        color: '#666666',
        marginTop: 2,
    },
    paymentAmount: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1E1E1E',
    },
    toggleButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 12,
        borderTopWidth: 1,
        borderTopColor: '#E5E5E5',
    },
    toggleButtonText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#1976D2',
        marginRight: 4,
    },
    progressCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        overflow: 'hidden',
        marginTop: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    timeline: {
        padding: 16,
    },
    timelineStep: {
        flexDirection: 'row',
        paddingBottom: 24,
    },
    timelineLeft: {
        width: 24,
        alignItems: 'center',
    },
    timelineConnector: {
        width: 2,
        flex: 1,
        marginTop: 4,
    },
    stepIndicator: {
        width: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    stepDetails: {
        flex: 1,
        paddingLeft: 12,
    },
    stepTitle: {
        fontSize: 14,
        fontWeight: '500',
        color: '#1E1E1E',
    },
    stepSubtitle: {
        fontSize: 12,
        color: '#666666',
        marginTop: 2,
    },
    stepStatus: {
        alignItems: 'flex-end',
        minWidth: 80,
    },
    stepDate: {
        fontSize: 12,
        color: '#666666',
    },
    checkmarkContainer: {
        marginTop: 4,
        paddingHorizontal: 8,
        paddingVertical: 2,
        backgroundColor: '#E8F5E9',
        borderRadius: 12,
    },
    checkmarkText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#2E7D32',
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },
    emptyStateText: {
        fontSize: 16,
        color: '#757575',
        marginTop: 8,
    }
});

export default TransactionTracker;