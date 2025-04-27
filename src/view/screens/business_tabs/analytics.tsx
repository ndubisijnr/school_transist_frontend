import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {style} from "@/src/hooks/styles";


const Analytics = () => {
    const [timeframe, setTimeframe] = useState('Month');

    return (
        <ScrollView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>Business Analytics</Text>
                <View style={styles.tabSelector}>
                    <TouchableOpacity
                        style={[styles.tabButton, timeframe === 'Week' && styles.activeTab]}
                        onPress={() => setTimeframe('Week')}>
                        <Text style={styles.tabText}>Week</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tabButton, timeframe === 'Month' && styles.activeTab]}
                        onPress={() => setTimeframe('Month')}>
                        <Text style={styles.tabText}>Month</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tabButton, timeframe === 'Year' && styles.activeTab]}
                        onPress={() => setTimeframe('Year')}>
                        <Text style={styles.tabText}>Year</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.card}>
                <Text style={styles.cardLabel}>Total Amount Received</Text>
                <View style={styles.cardContent}>
                    <Text style={styles.cardValue}>₦258,750</Text>
                    <View style={styles.iconContainer}>
                        <Ionicons name="cash-outline" size={24} color="#4285F4" />
                    </View>
                </View>
                <Text style={styles.positiveChange}>+12.5% from last month</Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.cardLabel}>Successful Transactions</Text>
                <View style={styles.cardContent}>
                    <Text style={styles.cardValue}>1,283</Text>
                    <View style={[styles.iconContainer, styles.successIconContainer]}>
                        <Ionicons name="checkmark-circle" size={24} color="#34A853" />
                    </View>
                </View>
                <Text style={styles.positiveChange}>+8.3% from last month</Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.cardLabel}>Failed Transactions</Text>
                <View style={styles.cardContent}>
                    <Text style={styles.cardValue}>127</Text>
                    <View style={[styles.iconContainer, styles.failedIconContainer]}>
                        <Ionicons name="close-circle" size={24} color="#EA4335" />
                    </View>
                </View>
                <Text style={styles.negativeChange}>-2.1% from last month</Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.cardLabel}>Conversion Rate</Text>
                <View style={styles.cardContent}>
                    <Text style={styles.cardValue}>91%</Text>
                    <View style={[styles.iconContainer, styles.conversionIconContainer]}>
                        <Ionicons name="stats-chart" size={24} color="#673AB7" />
                    </View>
                </View>
                <Text style={styles.positiveChange}>+0.4% from last month</Text>
            </View>

            <View style={styles.chartCard}>
                <Text style={styles.chartTitle}>Monthly Transactions</Text>
                <View style={styles.placeholderChart}>
                    <Ionicons name="bar-chart-outline" size={48} color="#D3D3D3" />
                    <Text style={styles.placeholderText}>Transaction trend would appear here</Text>
                </View>
            </View>

            <View style={styles.chartCard}>
                <Text style={styles.chartTitle}>Payment Methods</Text>
                <View style={styles.placeholderChart}>
                    <Ionicons name="pie-chart-outline" size={48} color="#D3D3D3" />
                    <Text style={styles.placeholderText}>Payment distribution would appear here</Text>
                </View>
            </View>

            <View style={styles.analysisCard}>
                <Text style={styles.chartTitle}>Transaction Analysis</Text>

                <View style={styles.analysisRow}>
                    <Text style={styles.analysisLabel}>Peak Transaction Times</Text>
                </View>

                <View style={styles.analysisItem}>
                    <Text style={styles.analysisItemLabel}>Weekday</Text>
                    <Text style={styles.analysisItemValue}>Thursday</Text>
                </View>

                <View style={styles.analysisItem}>
                    <Text style={styles.analysisItemLabel}>Time of Day</Text>
                    <Text style={styles.analysisItemValue}>2PM - 4PM</Text>
                </View>

                <View style={styles.analysisItem}>
                    <Text style={styles.analysisItemLabel}>Monthly</Text>
                    <Text style={styles.analysisItemValue}>End of Month</Text>
                </View>

                <View style={styles.analysisRow}>
                    <Text style={styles.analysisLabel}>Top Transaction Sources</Text>
                </View>

                <View style={styles.analysisItem}>
                    <Text style={styles.analysisItemLabel}>Mobile App</Text>
                    <Text style={styles.analysisItemValue}>64%</Text>
                </View>

                <View style={styles.analysisItem}>
                    <Text style={styles.analysisItemLabel}>Website</Text>
                    <Text style={styles.analysisItemValue}>28%</Text>
                </View>

                <View style={styles.analysisItem}>
                    <Text style={styles.analysisItemLabel}>In-Store</Text>
                    <Text style={styles.analysisItemValue}>8%</Text>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({...style})

export default  Analytics