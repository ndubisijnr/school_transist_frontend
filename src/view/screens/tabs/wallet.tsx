
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  StatusBar,
  Image,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const WalletScreen = () => {
    const [activeTab, setActiveTab] = useState('Activity');

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
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />


            {/* Tab Header */}
            <View style={styles.tabsContainer}>
                <TouchableOpacity
                    style={styles.tabButton}
                    onPress={() => setActiveTab('Wallet')}
                >
                    <Text style={[
                        styles.tabText,
                        activeTab === 'Wallet' ? styles.activeTabText : styles.inactiveTabText
                    ]}>
                        Wallet
                    </Text>
                    {activeTab === 'Wallet' && <View style={styles.activeTabIndicator} />}
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.tabButton}
                    onPress={() => setActiveTab('Activity')}
                >
                    <Text style={[
                        styles.tabText,
                        activeTab === 'Activity' ? styles.activeTabText : styles.inactiveTabText
                    ]}>
                        Activity
                    </Text>
                    {activeTab === 'Activity' && <View style={styles.activeTabIndicator} />}
                </TouchableOpacity>
            </View>

            {/* Main Content */}
            <View style={styles.content}>
                {renderTabContent()}
            </View>

        
        </SafeAreaView>
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
    }
});

export default WalletScreen