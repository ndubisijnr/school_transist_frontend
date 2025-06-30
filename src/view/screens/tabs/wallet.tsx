import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    RefreshControl
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {ContainerScrollViewLayout} from "@/view/layout/ContainerScrollViewLayout";
import {RootState, useAppDispatch, useAppSelector} from "@/store";
import app from "@/store/modules/app";

const WalletScreen = () => {
    const [activeTab, setActiveTab] = useState('Activity');
    const [activeFilter, setActiveFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [allRides, setAllRides] = useState([]);

    const {studentActivities, hubActivities} = useAppSelector((state:RootState) => state.app)
    const {userDetails} = useAppSelector((state:RootState) => state.auth)
    const dispatch = useAppDispatch()

    const ITEMS_PER_PAGE = 10;

    useEffect(() => {
        console.log(userDetails)
        if(userDetails?.hub?.id){
            dispatch(app.action.readRideByHub(userDetails?.hub?.id))
        }

        if(userDetails?.student?.id){
            dispatch(app.action.readRideByStudent(userDetails?.student?.id))
        }
    }, [userDetails]);

    useEffect(() => {
        // Combine rides from both student and hub activities
        const combinedRides = [
            ...(studentActivities || []),
            ...(hubActivities || [])
        ];

        // Sort by date (most recent first)
        const sortedRides = combinedRides.sort((a, b) =>
            new Date(b.created_at || b.date || 0) - new Date(a.created_at || a.date || 0)
        );

        setAllRides(sortedRides);
        setCurrentPage(1);
    }, [studentActivities, hubActivities]);

    const getFilteredRides = () => {
        switch (activeFilter) {
            case 'completed':
                return allRides.filter(ride =>
                    ride.transit_status?.toLowerCase() === 'completed'
                );
            case 'cancelled':
                return allRides.filter(ride =>
                    ride.transit_status?.toLowerCase() === 'cancelled'
                );
            case 'pending':
                return allRides.filter(ride =>
                    ride.transit_status?.toLowerCase() === 'pending'
                );
            default:
                return allRides;
        }
    };

    const getCurrentPageRides = () => {
        const filteredRides = getFilteredRides();
        const startIndex = 0;
        const endIndex = currentPage * ITEMS_PER_PAGE;
        return filteredRides.slice(startIndex, endIndex);
    };

    const loadMoreRides = () => {
        const filteredRides = getFilteredRides();
        if (isLoadingMore || getCurrentPageRides().length >= filteredRides.length) return;

        setIsLoadingMore(true);

        setTimeout(() => {
            setCurrentPage(prev => prev + 1);
            setIsLoadingMore(false);
        }, 500);
    };

    const onRefresh = () => {
        setIsRefreshing(true);
        setCurrentPage(1);

        // Refresh data
        if(userDetails?.hub?.id){
            dispatch(app.action.readRideByHub(userDetails?.hub?.id))
        }

        if(userDetails?.student?.id){
            dispatch(app.action.readRideByStudent(userDetails?.student?.id))
        }

        setTimeout(() => {
            setIsRefreshing(false);
        }, 1000);
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const formatTime = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'completed':
                return 'bg-green-100';
            case 'pending':
                return 'bg-yellow-100';
            case 'cancelled':
                return 'bg-red-100';
            default:
                return 'bg-green-100';
        }
    };

    const getStatusTextColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'completed':
                return 'text-green-800';
            case 'pending':
                return 'text-yellow-800';
            case 'cancelled':
                return 'text-red-800';
            default:
                return 'text-green-800';
        }
    };

    const RideItem = ({ item, index }) => (
        <View className="bg-white rounded-xl p-4 mb-3 border border-gray-100">
            <View className="flex-row items-center mb-3">
                <View className="w-10 h-10 rounded-full bg-blue-100 justify-center items-center mr-3">
                    <Ionicons
                        name="car-outline"
                        size={20}
                        color="#3B82F6"
                    />
                </View>
                <View className="flex-1">
                    <Text className="text-base font-semibold text-gray-800 mb-1">
                        {item.where_from} - {item.where_to}
                    </Text>
                    <Text className="text-sm text-gray-500">
                        {formatDate(item.created_at || item.date)}
                    </Text>
                </View>
                <View className="items-end">
                    <Text className="text-base font-semibold text-gray-800 mb-1">
                        ₦{item.transit_fee || '0.00'}
                    </Text>
                    <Text className="text-xs text-gray-400">
                        {formatTime(item.created_at || item.date)}
                    </Text>
                </View>
            </View>

            <View className="flex-row justify-between items-center">
                <View className={`px-2 py-1 rounded-lg ${getStatusColor(item.transit_status)}`}>
                    <Text className={`text-xs font-medium ${getStatusTextColor(item.transit_status)}`}>
                        {item.transit_status || 'Completed'}
                    </Text>
                </View>

                {item.driver && (
                    <Text className="text-xs text-gray-500 italic">
                        Driver: {item.driver}
                    </Text>
                )}
            </View>
        </View>
    );

    const renderEmptyState = () => (
        <View className="flex-1 items-center justify-center px-10">
            <View className="w-15 h-15 rounded-lg border-2 border-gray-800 justify-center items-center mb-5">
                <Ionicons name="receipt-outline" size={40} color="#333" />
            </View>
            <Text className="text-sm text-center text-gray-500 leading-5">
                {activeFilter === 'all'
                    ? "Keep track of your rides here. Let's get started."
                    : `No ${activeFilter} rides found.`
                }
            </Text>
        </View>
    );

    const renderFooter = () => {
        if (!isLoadingMore) return null;

        return (
            <View className="flex-row justify-center items-center py-5">
                <ActivityIndicator size="small" color="#3B82F6" />
                <Text className="ml-2 text-sm text-gray-500">Loading more rides...</Text>
            </View>
        );
    };

    const FilterTab = ({ title, filterKey, count }) => (
        <TouchableOpacity
            className={`px-4 py-2 rounded-full mr-3 ${
                activeFilter === filterKey
                    ? 'bg-gray-900'
                    : 'bg-gray-100'
            }`}
            onPress={() => {
                setActiveFilter(filterKey);
                setCurrentPage(1);
            }}
        >
            <Text className={`text-sm font-medium ${
                activeFilter === filterKey
                    ? 'text-white'
                    : 'text-gray-600'
            }`}>
                {title} {count > 0 && `(${count})`}
            </Text>
        </TouchableOpacity>
    );

    const getFilterCounts = () => {
        return {
            all: allRides.length,
            completed: allRides.filter(ride => ride.transit_status?.toLowerCase() === 'completed').length,
            pending: allRides.filter(ride => ride.transit_status?.toLowerCase() === 'pending').length,
            cancelled: allRides.filter(ride => ride.transit_status?.toLowerCase() === 'cancelled').length,
        };
    };

    const renderTabContent = () => {
        if (activeTab === 'Activity') {
            const currentRides = getCurrentPageRides();
            const filteredRides = getFilteredRides();
            const counts = getFilterCounts();

            return (
                <View className="flex-1">
                    {/* Filter Tabs */}
                    <View className="mb-4">
                        <FlatList
                            data={[
                                { title: 'All', key: 'all', count: counts.all },
                                { title: 'Completed', key: 'completed', count: counts.completed },
                                // { title: 'Pending', key: 'pending', count: counts.pending },
                                { title: 'Cancelled', key: 'cancelled', count: counts.cancelled },
                            ]}
                            renderItem={({ item }) => (
                                <FilterTab
                                    title={item.title}
                                    filterKey={item.key}
                                    count={item.count}
                                />
                            )}
                            keyExtractor={(item) => item.key}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ paddingHorizontal: 4 }}
                        />
                    </View>

                    {/* Rides List */}
                    <FlatList
                        data={currentRides}
                        renderItem={RideItem}
                        keyExtractor={(item, index) => `${item.id || index}-${index}`}
                        showsVerticalScrollIndicator={false}
                        onEndReached={loadMoreRides}
                        onEndReachedThreshold={0.1}
                        ListFooterComponent={renderFooter}
                        ListEmptyComponent={renderEmptyState}
                        refreshControl={
                            <RefreshControl
                                refreshing={isRefreshing}
                                onRefresh={onRefresh}
                                colors={['#3B82F6']}
                            />
                        }
                        contentContainerStyle={
                            currentRides.length === 0 ? { flexGrow: 1, justifyContent: 'center' } : {}
                        }
                    />

                    {currentRides.length > 0 && (
                        <View className="py-3 items-center border-t border-gray-100 mt-2">
                            <Text className="text-xs text-gray-400">
                                Showing {currentRides.length} of {filteredRides.length} rides
                            </Text>
                        </View>
                    )}
                </View>
            );
        }
        else if(activeTab === 'Wallet') {
            return (
                <View className="flex-1 items-center justify-start w-full">
                    <View className="bg-black w-full rounded-xl justify-center items-center h-[180px] relative overflow-hidden p-6">
                        <View className="h-full border w-full relative">
                            <Text className="text-white text-3xl font-bold">₦5,000.00</Text>

                            <View className="absolute bottom-0 flex-row justify-between w-full">
                                <View>
                                    <Text className="text-gray-400 text-xs">Bank name</Text>
                                    <Text className="text-white text-sm">Paystack Titan</Text>
                                </View>

                                <Text className="text-white text-xl font-bold">0233233434</Text>
                            </View>
                        </View>
                    </View>
                </View>
            );
        }
    };

    return (
        <ContainerScrollViewLayout>
            {/* Tab Header */}
            <View className="flex-row px-4 border-b border-gray-200">
                <TouchableOpacity
                    className="py-4 mr-6 relative"
                    onPress={() => setActiveTab('Activity')}
                >
                    <Text className={`text-base font-medium ${
                        activeTab === 'Activity'
                            ? 'text-black font-semibold'
                            : 'text-gray-500'
                    }`}>
                        Activity
                    </Text>
                    {activeTab === 'Activity' && (
                        <View className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
                    )}
                </TouchableOpacity>
            </View>

            {/* Main Content */}
            <View className="flex-1 p-3">
                {renderTabContent()}
            </View>
        </ContainerScrollViewLayout>
    );
}

export default WalletScreen